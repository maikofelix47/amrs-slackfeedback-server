const slackconfig = require('./config/slackconfig')


function getChannelMessage(count, oldest) {
    var options = {
        url: 'https://slack.com/api/channels.history',
        qs: {
            token: slackconfig.slack.bottoken,
            channel: slackconfig.slack.channelID,
            count: count,
            oldest: oldest

        },

        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    return new Promise(function(resolve, reject) {
        rp(options)
            .then(function(data) {
                resolve(data);
                console.log(data);
            }).catch(function(err) {
                reject(err);
            });


    });
}
getChannelMessage(10);

module.exports.getChannelMessage = getChannelMessage;