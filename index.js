require('dotenv').config();

var subreddit = require('./subreddit');
//Reset the bot every 23 hours(82800000ms)
setInterval(function() {
	process.exit(1);
}, 82800000);
new subreddit('TakimotoHifumi', {
    twitter: {
        access_token: process.env.TakimotoHifumi_twitter_accesToken,
        access_token_secret: process.env.TakimotoHifumi_twitter_accesTokenSecret,
        consumer_key: process.env.TakimotoHifumi_twitter_consumerKey,
        consumer_secret: process.env.TakimotoHifumi_twitter_consumerSecret,
    },
    reddit: {
        username: process.env.reddit_username,
        password: process.env.reddit_password,
        userAgent: 'r/TakimotoHifumi Twitter Bot',
        clientId: process.env.TakimotoHifumi_reddit_clientID,
        clientSecret: process.env.TakimotoHifumi_reddit_clientSecret
    }
});

new subreddit('SuzukazeAoba', {
    twitter: {
        access_token: process.env.SuzukazeAoba_twitter_accesToken,
        access_token_secret: process.env.SuzukazeAoba_twitter_accesTokenSecret,
        consumer_key: process.env.SuzukazeAoba_twitter_consumerKey,
        consumer_secret: process.env.SuzukazeAoba_twitter_consumerSecret,
    },
    reddit: {
        username: process.env.reddit_username,
        password: process.env.reddit_password,
        userAgent: 'r/SuzukazeAoba Twitter Bot',
        clientId: process.env.SuzukazeAoba_reddit_clientID,
        clientSecret: process.env.SuzukazeAoba_reddit_clientSecret
    }
});
console.log('Started');
