const yargs = require('yargs');
const fs = require('fs');
const api = require('./api-functions');


/* Main */
let episodes, rankings;

api.getAirtableData('keyiAfm7QZhgG2nkV','Ratings','IG Score').then((data) => {
    rankings = data;
    console.log(data);
    api.getSimplecastData('ce93694b-1ad6-421b-af90-5a35ac2d1430', 'eyJhcGlfa2V5IjoiMzBjZDYyYzJiMWJhODMwNzlkZmZmMzQ2NTdjMjlkMTUifQ==')
    .then((data) => {
        fs.writeFileSync('./src/database/data2.json', JSON.stringify(data, null, '\t'));
    });
});