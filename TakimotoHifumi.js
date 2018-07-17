class TakimotoHifumi {
    /**
     * TakimotoHifumi subreddit
     */
    constructor() {
        // Link shorter
        var isgd = require('isgd');

        // Twitter setup
        var _twit = require('twit');
        const twit = new _twit({
            access_token: process.env.TakimotoHifumi_twitter_accesToken,
            access_token_secret: process.env.TakimotoHifumi_twitter_accesTokenSecret,
            consumer_key: process.env.TakimotoHifumi_twitter_consumerKey,
            consumer_secret: process.env.TakimotoHifumi_twitter_consumerSecret,
        });

        // Reddit setup
        var _reddit = require('snoowrap');
        var snoostorm = require('snoostorm');
        var r = new _reddit({
            username: process.env.reddit_username,
            password: process.env.reddit_password,
            userAgent: 'r/HifumiTakimoto Twitter Bot',
            clientId: process.env.TakimotoHifumi_reddit_clientID,
            clientSecret: process.env.TakimotoHifumi_reddit_clientSecret
        });
        const reddit = new snoostorm(r);

        // The bot itself
        reddit.SubmissionStream({
            subreddit: 'TakimotoHifumi'
        }).on('submission', sub => {
            isgd.shorten('https://www.reddit.com/' + sub.permalink, (link) => {
                twit.post('statuses/update', {
                    status: '(' + link + ') ' + sub.title
                }).then((tw) => {
                    console.log('[r/TakimotoHifumi] Posted:' + tw.data.text);
                }).catch(err => console.log(err));
            });

        });

    }
}
console.log('Loaded r/TakimotoHifumi');

module.exports = TakimotoHifumi;
