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
        let season = 0;
        for(let i = 0; i < episodes.length; i++){
            if(episodes[i].season.number < season || i === 0){
                season = episodes[i].season.number;
                episodes[i]["finale"] = true;
            }
            if(episodes[i].type === 'full'){
                episodes[i]['Ranking Info'] = rankings.find(r => r.Episode === `${episodes[i].season.number}-${episodes[i].number}`);
            }
        }
        
        fs.writeFileSync('./src/database/data.json', JSON.stringify(episodes, null, '\t'));
    });
});