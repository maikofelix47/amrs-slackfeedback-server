const slackconfig = require('../config/slackconfig.json')
const rp = require('request-promise');

function getChannelFeedback(count, oldest) {
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
            }).catch(function(err) {
                reject(err);
            });
    });
}

var getfeedback = {
    getChannelFeedback:getChannelFeedback,
}

module.exports.getfeedback = getfeedback;