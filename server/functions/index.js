const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

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
    functions.logger.info(`Error: ${error}`, { structuredData: true });
  });
}

async function updatePodcastData(data) {
  if (!data)
    return;

  await admin.firestore().collection('podcast-data').get().then((c) => {
    for (let i = 0; i < data.length; i++) {
      functions.logger.info(data[i].id);
      if (!c.docs.some(doc => doc.id === data[i].id)) {
        admin.firestore().collection('podcast-data').doc(data[i].id).set(data[i]);
        functions.logger.info(`Added episode Id: ${data[i].id}`, { structuredData: true });
      } else {
        admin.firestore().collection('podcast-data').doc(data[i].id).update(data[i]);
        functions.logger.info(`Updated episode Id: ${data[i].id}`, { structuredData: true });
      }
    }
    return;
  }).catch((error) => {
    functions.logger.warn(`Error: ${error}`, { structuredData: true });
  });
  
}

exports.updatePodcastData = functions.pubsub.schedule('50 7 * * *')
.timeZone('America/Chicago')
.onRun(async (context) => {
  try { 
    var apiKeysColl = await admin.firestore().collection('api-keys').get();

    if (!apiKeysColl.docs[0])
      return;

    var apiKeys = apiKeysColl.docs[0].data();
    var data = [];
    var url = `https://api.simplecast.com/podcasts/${apiKeys.simplecast_id}/episodes`;
    var responseData = await getSimplecastData(url, apiKeys.simplecast_key);
    Array.prototype.push.apply(data, responseData.collection);

    const total = responseData.pages.total;
    var count = 0;
    while (responseData && responseData.pages.next && count < total) {
      // eslint-disable-next-line no-await-in-loop
      responseData = await getSimplecastData(responseData.pages.next.href, apiKeys.simplecast_key);
      Array.prototype.push.apply(data, responseData.collection);
      count++;
    }

    updatePodcastData(data);
    functions.logger.info('Podcast data updated');
  } catch(e) {
    functions.logger.warn(`Error occurred while trying to update podcast data: ${e}`);
  }
});
