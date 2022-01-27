const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

/*Global*/
const runtimeOpts = {
  timeoutSeconds: 30,
  memory: '512MB'
};

async function updateData(data, collection) {
  if (!data)
    return;

  var collectionRef = admin.firestore().collection(collection);
  
  await collectionRef.get().then((c) => {
    for (let i = 0; i < data.length; i++) {
      if (!c.docs.some(doc => doc.id === data[i].id)) {
        data[i].id ? collectionRef.doc(data[i].id).set(data[i]) : collectionRef.add(data[i]);
      } else {
        collectionRef.doc(data[i].id).update(data[i]);
      }
    }
    return;
  }).catch((error) => {
    functions.logger.warn(`Error updating data: ${error}`);
  });
  
}

/* Simplecast Integration */
async function getSimplecastData (url, podKey) {
  const header = { 'authorization' : `Bearer ${podKey}` };

	try {
    const res = await fetch(url, {
      method: 'get',
      headers: header
    });
    const data = res.json();
    return data;
  } catch (error) {
    functions.logger.warn(`Error making Simplecast request: ${error}`);
    return null;
  }
}

async function updatedSimplecastData(apiKeys){
  var updatedSimplecastData = [];
  var url = `https://api.simplecast.com/podcasts/${apiKeys.simplecast_id}/episodes`;
  var simplecastData = await getSimplecastData(url, apiKeys.simplecast_key);

  if (!simplecastData)
    return updatedSimplecastData;

  Array.prototype.push.apply(updatedSimplecastData, simplecastData.collection);

  const total = simplecastData.pages.total;
  var count = 0;
  while (simplecastData && simplecastData.pages.next && count < total) {
    // eslint-disable-next-line no-await-in-loop
    simplecastData = await getSimplecastData(simplecastData.pages.next.href, apiKeys.simplecast_key);

    if (!simplecastData)
      return updatedSimplecastData;

    Array.prototype.push.apply(updatedSimplecastData, simplecastData.collection);
    count++;
  }

  updateData(updatedSimplecastData, 'podcast-data');
  console.log('Episodes successfully imported from Simplecast');
  return updatedSimplecastData;
}

/* Airtable Integration */
function correctAirtableObjectPropertyNames(dataObj) {
  var rData = {};
  rData.id = dataObj.id; //Need to put id into one object container

  Object.keys(dataObj.fields).forEach((key) => {
    var newKeyName = key.toLowerCase().replace(' ', '_').replace('.','');
    newKeyName = newKeyName.includes('kevin\'s') ? newKeyName.replace('kevin\'s', 'k') : newKeyName;
    newKeyName = newKeyName.includes('peter\'s') ? newKeyName.replace('peter\'s', 'p') : newKeyName;
    rData[newKeyName] = dataObj.fields[key];
  });

  return rData;
}

async function updatedAirtableData(apiKeys, simplecastData) {
  var url = `https://api.airtable.com/v0/appDCLBXIkefciEz4/Ratings?api_key=${apiKeys.airtable_key}`;
  const airtableResponse = await fetch(url, {method: 'get'});
  const airtableResponseData = await airtableResponse.json();
  var rankings = [];
  for(let i = 0; i < airtableResponseData.records.length; i++) {
    var rData = correctAirtableObjectPropertyNames(airtableResponseData.records[i]);

    /*Tie episode to ranking*/
    // eslint-disable-next-line no-loop-func
    const episodeData = simplecastData.find(ep => rData.episode === `${ep.season.number}-${ep.number}`);

    if (episodeData) {
      rData.published_at = episodeData.published_at;
    }

    rankings.push(rData);
  }
  updateData(rankings, 'ratings-data');
  console.log('Ratings successfully imported from AirTable');
}

/*Main Function*/

//exports.updatePodcastData = functions.runWith(runtimeOpts).https.onRequest(async (request, response) => {
exports.updatePodcastData = functions.pubsub.schedule('50 7 * * *').timeZone('America/Chicago')
.onRun(async (context) => {
  try { 
    var apiKeysColl = await admin.firestore().collection('api-keys').get().catch(error => {
      functions.logger.warn(`Error retrieving api key: ${error}`);
    });

    if (!apiKeysColl || !apiKeysColl.docs[0])
      return;

    var apiKeys = apiKeysColl.docs[0].data();

    const simplecastData = await updatedSimplecastData(apiKeys);
    await updatedAirtableData(apiKeys, simplecastData);

    //response.send('Import successful'); --Debug Only
  } catch(e) {
    functions.logger.warn(`Error occurred while trying to update podcast data: ${e}`);
    //response.send('Import Failed'); --Debug Only
  }
});