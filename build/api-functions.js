const fetch = require('node-fetch');

/* airtable */
async function getAirtableData (key, table, sortBy) {
  const rankingsData = await fetch(`https://api.airtable.com/v0/appDCLBXIkefciEz4/${table}?api_key=${key}`)
  .then(res => res.json())
  .then(async data => {
    let rankings = [];
    for(let i = 0; i < data.records.length; i++){
      rankings.push(data.records[i].fields);
    }
    rankings.sort((a, b) => b['IG Score'] - a['IG Score']);
    //Assign rank
    for(let i = 0; i < rankings.length; i++) {
      const currentScore = rankings[i]['IG Score'];
      const lastScore = rankings[i - 1] ? rankings[i - 1]['IG Score']: null;
      rankings[i]['rank'] = lastScore && (currentScore === lastScore) ? rankings[i - 1]['rank'] : i + 1;
    }
    return rankings;
  });

  return rankingsData;
}

/* Simplecast */
function addEpisode(episodes, episode){
  console.log(`Fetching page.. ${episode.pages.current}`);
  for(let i =0; i < episode.collection.length; i++){
    episodes.push(episode.collection[i]);
  }
}

async function getSimplecastData (podId, podKey) {
  const header = { 'authorization' : `Bearer ${podKey}` };

	const simplecastData = await fetch(`https://api.simplecast.com/podcasts/${podId}/episodes`, {
		method: 'get',
		headers: header
	})
  .then(res => res.json())
	.then(async data => {
    response = data;
    let episodes = [];
    addEpisode(episodes, response);
    while(response.pages.next !== null){
      response = await fetch(response.pages.next.href, {
        method: 'get',
        headers: header
      }).then(response => response.json());

      addEpisode(episodes, response);
    }
    return episodes;
  });

	return simplecastData;
}

module.exports = {
  getAirtableData,
  getSimplecastData
}