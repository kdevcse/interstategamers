const yargs = require('yargs');
const Twitter = require('twitter-lite');

const argv = yargs
    .option('consumer_key', {
        alias: 'a',
        type: 'string'
    })
    .option('consumer_secret', {
        alias: 'b',
        type: 'string'
    })
    .option('access_key', {
        alias: 'c',
        type: 'string'
    })
    .option('access_secret', {
        alias: 'd',
        type: 'string'
    }).help().argv;

if (!argv.consumer_key || !argv.consumer_secret || !argv.access_key || !argv.access_secret) {
    console.log("You entered the arguments incorrectly.");
    console.log("It should be { consumer_key, consumer_secret, access_token_key, access_token_secret }");
    return;
}

sendTweet(argv.consumer_key, argv.consumer_secret, argv.access_key, argv.access_secret);

async function sendTweet(ck, cs, ak, as) {
    const app = new Twitter({
        consumer_key: ck,
        consumer_secret: cs,
        access_token_key: ak,
        access_token_secret: as
    });
    
    app.post('statuses/update', {
        status: 'This is a test of the emergency tweet system. Please ignore :)'
    }).then( results => {
        console.log('results', results);
    }). catch(console.error);
}