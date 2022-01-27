/* imports */
/*const yargs = require('yargs');
const Twitter = require('twitter-lite');
const data = require('../dist/database/data.json');*/

/* constants */
/*const latestEpisode = data.slice(-1)[0];
const ep_status = latestEpisode["status"];
const ep_title = latestEpisode["title"];
const ep_url = "https://theinterstategamers.simplecast.com/episodes/" + latestEpisode["slug"];
const ep_desc = latestEpisode["description"];
const DO_NOT_POST_PAST_HOUR = 17;
const epDate = new Date(latestEpisode.published_at);
const now = new Date();*/

/* Definitions */
/*Date.prototype.sameDay = function(d) {
    return this.getFullYear() === d.getFullYear()
    && this.getDate() === d.getDate()
    && this.getMonth() === d.getMonth();
}

const argv = yargs
    .option('consumer_key', {
        alias: 'c',
        type: 'string'
    })
    .option('consumer_secret', {
        alias: 's',
        type: 'string'
    })
    .option('access_key', {
        alias: 'a',
        type: 'string'
    })
    .option('access_secret', {
        alias: 't',
        type: 'string'
    }).help().argv;

if (!argv.consumer_key || !argv.consumer_secret || !argv.access_key || !argv.access_secret) {
    console.log("You entered the arguments incorrectly.");
    console.log("It should be { consumer_key, consumer_secret, access_token_key, access_token_secret }");
    return;
}*/

/* Implement */
/*console.log(`Episode Status: ${ep_status}`);
console.log(`Date now: ${now}`);
console.log(`Date episode: ${epDate}`);

if (ep_status === 'published' && epDate.sameDay(now) && now.getHours() <= DO_NOT_POST_PAST_HOUR){
    sendTweet(argv.consumer_key, argv.consumer_secret, argv.access_key, argv.access_secret);
}
else {
    console.log('No tweet to post');
}*/

/* Functions */
/*async function sendTweet(ck, cs, ak, as) {
    //Setup
    const app = new Twitter({
        consumer_key: ck,
        consumer_secret: cs,
        access_token_key: ak,
        access_token_secret: as
    });
    
    //Tweet
    app.post('statuses/update', {
        status: `NEW EPISODE: ${ep_title}\n\n${ep_desc}\n\n ${ep_url}`
    }).then((results) => {
        console.log('Tweet successful');
        let follow_up_tweet = "You can also find our new episode on:\n\n"
        follow_up_tweet += "Apple Podcasts: https://podcasts.apple.com/us/podcast/the-interstate-gamers/id1332503062"
        follow_up_tweet += "\nGoogle Play: https://play.google.com/music/listen?u=0#/ps/I52grgkf57z7gdp6zqwewo3smlq"
        follow_up_tweet += "\nSpotify: https://open.spotify.com/show/3WiDNf7oaBADnLGycQzYuu"
        follow_up_tweet += "\nStitcher: https://www.stitcher.com/podcast/the-interstate-gamers"
        follow_up_tweet += "\n\nAnd many other various platforms! Give us a follow/subscribe!"
        
        //Follow up tweet
        app.post('statuses/update', {
          status: `@theIG_cast ${follow_up_tweet}`,
          in_reply_to_status_id: results.id_str,
        })
        .then(() => {
            console.log('Follow up tweet succesful.');
        })
        .catch(console.error);

    }).catch(console.error);
}*/
