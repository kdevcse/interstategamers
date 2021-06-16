const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

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
function getSimplecastData (url, podKey) {
  const header = { 'authorization' : `Bearer ${podKey}` };

	return fetch(url, {
		method: 'get',
		headers: header
	})
  .then(res => res.json())
	.then(data => {
    return data;
  }).catch((error) => {
    functions.logger.warn(`Error making Simplecast request: ${error}`);
  });
}

exports.updatePodcastData = functions.pubsub.schedule('50 7 * * *')
.timeZone('America/Chicago')
.onRun(async (context) => {
  try { 
    var apiKeysColl = await admin.firestore().collection('api-keys').get().catch(error => {
      functions.logger.warn(`Error retrieving api key: ${error}`);
    });

    if (!apiKeysColl || !apiKeysColl.docs[0])
      return;

    var apiKeys = apiKeysColl.docs[0].data();
    var data = [];
    var url = `https://api.simplecast.com/podcasts/${apiKeys.simplecast_id}/episodes`;
    var responseData = await getSimplecastData(url, apiKeys.simplecast_key);

    if (!responseData)
      return;

    Array.prototype.push.apply(data, responseData.collection);

    const total = responseData.pages.total;
    var count = 0;
    while (responseData && responseData.pages.next && count < total) {
      // eslint-disable-next-line no-await-in-loop
      responseData = await getSimplecastData(responseData.pages.next.href, apiKeys.simplecast_key);

      if (!responseData)
        return;

      Array.prototype.push.apply(data, responseData.collection);
      count++;
    }

    updateData(data, 'podcast-data');
  } catch(e) {
    functions.logger.warn(`Error occurred while trying to update podcast data: ${e}`);
  }
});

/* Airtable Integration */
/*
const runtimeOpts = {
  timeoutSeconds: 30,
  memory: '512MB'
};

function correctAirtableObjectPropertyNames(dataObj) {
  var rData = {};
  rData.id = dataObj.id; //Need to put id into one object container

  Object.keys(dataObj.fields).forEach((key) => {
    var newKeyName = key.toLowerCase().replace(' ', '_').replace('.','');
    newKeyName = newKeyName.includes('kevin\'s') ? newKeyName.replace('kevin\'s', 'k') : newKeyName;
    newKeyName = newKeyName.includes('peter\'s') ? newKeyName.replace('peter\'s', 'k') : newKeyName;
    rData[newKeyName] = dataObj.fields[key];
  });

  return rData;
}

exports.importAirtableData = functions.runWith(runtimeOpts).https.onRequest(async (request, response) => {
  var apiKeysColl = await admin.firestore().collection('api-keys').get();

  if (!apiKeysColl.docs[0])
    return;

  var apiKeys = apiKeysColl.docs[0].data();
  var url = `https://api.airtable.com/v0/appDCLBXIkefciEz4/Ratings?api_key=${apiKeys.airtable_key}`;
  var rankingsData = await fetch(url, {
    method: 'get'
  })
  .then(res => res.json())
  .then(data => {
    var rankings = [];
    for(let i = 0; i < data.records.length; i++) {
      var rData = correctAirtableObjectPropertyNames(data.records[i]);
      rankings.push(rData);
      console.log(rankings[i]);
    }
    return rankings;
  }).catch((error) => {
    console.log(error);
  });

  updateData(rankingsData, 'ratings-data');
  response.send('Ratings successfully imported from AirTable');
});*/
