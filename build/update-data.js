const yargs = require('yargs');
const fs = require('fs');
const api = require('./api-functions');


const argv = yargs
    .option('airtable', {
        alias: 'a',
        type: 'string',
        required: true
    })
    .option('podId', {
        alias: 'i',
        type: 'string',
        required: true
    })
    .option('podKey', {
        alias: 'k',
        type: 'string',
        required: true
    }).help().argv;

/* Main */
let episodes, rankings;

api.getAirtableData(argv.airtable,'Ratings','IG Score').then((data) => {
    rankings = data;
    api.getSimplecastData(argv.podId, argv.podKey)
    .then((data) => {
        episodes = data;
        episodes.map(episode => {
            if (episode.type === 'full'){
                episode['Ranking Info'] = rankings.find(r => r.Episode === `${episode.season.number}-${episode.number}`);
            }
        });
        fs.writeFileSync('./src/database/data.json', JSON.stringify(episodes, null, '\t'));
    });
});