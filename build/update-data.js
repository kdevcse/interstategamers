const yargs = require('yargs');
const fs = require('fs');
const api = require('./api-functions');


const argv = yargs
    .option('airtable', {
        alias: 'a',
        type: 'string'
    })
    .option('podId', {
        alias: 'i',
        type: 'string'
    })
    .option('podKey', {
        alias: 'k',
        type: 'string'
    })
    .option().help().argv;

if (!argv.airtable || !argv.podId || !argv.podKey) {
    console.log("You entered the arguments incorrectly.");
    return;
}

/* Main */
let episodes, rankings;

api.getAirtableData(argv.airtable,'Ratings','IG Score').then((data) => {
    rankings = data;
    console.log(rankings);
    api.getSimplecastData(argv.podId, argv.podKey)
    .then((data) => {
        episodes = data;
        for(let i = 0; i < episodes.length; i++){
            if (episodes[i].type === 'full'){
                episodes[i]['Ranking Info'] = rankings
            }
        }
        fs.writeFileSync('./src/database/data2.json', JSON.stringify(data, null, '\t'));
    });
});