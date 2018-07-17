class SuzukazeAoba {
    /**
     * SuzukazeAoba subreddit
     */
    constructor() {
        // Link shorter
        var isgd = require('isgd');

        // Twitter setup
        var _twit = require('twit');
        const twit = new _twit({
            access_token: process.env.SuzukazeAoba_twitter_accesToken,
            access_token_secret: process.env.SuzukazeAoba_twitter_accesTokenSecret,
            consumer_key: process.env.SuzukazeAoba_twitter_consumerKey,
            consumer_secret: process.env.SuzukazeAoba_twitter_consumerSecret,
        });

        // Reddit setup
        var _reddit = require('snoowrap');
        var snoostorm = require('snoostorm');
        var r = new _reddit({
            username: process.env.reddit_username,
            password: process.env.reddit_password,
            userAgent: 'r/SuzukazeAoba Twitter Bot',
            clientId: process.env.SuzukazeAoba_reddit_clientID,
            clientSecret: process.env.SuzukazeAoba_reddit_clientSecret
        });
        const reddit = new snoostorm(r);

        // The bot itself
        reddit.SubmissionStream({
            subreddit: 'SuzukazeAoba'
        }).on('submission', sub => {
            isgd.shorten('https://www.reddit.com/' + sub.permalink, (link) => {
                twit.post('statuses/update', {
                    status: '(' + link + ') ' + sub.title
                }).then((tw) => {
                    console.log('[r/SuzukazeAoba] Posted:' + tw.data.text);
                }).catch(err => console.log(err));
            });

        });
    }
}

console.log('Loaded r/SuzukazeAoba');

module.exports = SuzukazeAoba;
