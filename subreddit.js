class Subreddit {
    /**
     * Subreddit
     * @param {string} subreddit 
     * @param {Object} credentials
     */
    constructor(subreddit, credentials) {
        this.subreddit = subreddit;
        this.credentials = credentials;

        // Link shorter
        var isgd = require('isgd');

        // Twitter setup
        var _twit = require('twit');
        const twit = new _twit(this.credentials.twitter);

        // Reddit setup
        var _reddit = require('snoowrap');
        var snoostorm = require('snoostorm');

        var r = new _reddit({
            userAgent: this.credentials.reddit.userAgent,
            username: this.credentials.reddit.username,
            password: this.credentials.reddit.password,
            clientId: this.credentials.reddit.clientId,
            clientSecret: this.credentials.reddit.clientSecret,

        });
        // The bot itself
        new snoostorm.SubmissionStream(r, {
            subreddit: this.subreddit,
        }).on('submission', sub => {
            isgd.shorten('https://www.reddit.com/' + sub.permalink, (link) => {
                twit.post('statuses/update', {
                    status: '(' + link + ') ' + sub.title
                }).then((tw) => {
                    console.log('[r/' + this.subreddit + '] Posted:' + tw.data.text);
                }).catch(err => {
                    console.log('ERROR:');
                    console.error(err);
                    console.log('======')
                });
            });

        });
        console.log('Loaded r/' + this.subreddit);
    }
}

module.exports = Subreddit;
