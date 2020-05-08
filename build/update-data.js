const yargs = require('yargs');
const fs = require('fs');
const api = require('./api-functions');


/* Main */
let episodes, rankings;

api.getAirtableData('keyiAfm7QZhgG2nkV','Ratings','IG Score').then((data) => {
    rankings = data;
    api.getSimplecastData('ce93694b-1ad6-421b-af90-5a35ac2d1430', 'eyJhcGlfa2V5IjoiMzBjZDYyYzJiMWJhODMwNzlkZmZmMzQ2NTdjMjlkMTUifQ==')
    .then((data) => {
        //console.log(data);
    });
});