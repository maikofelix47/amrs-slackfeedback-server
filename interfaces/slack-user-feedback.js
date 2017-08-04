const slackconfig = require('../config/slackconfig')
const rp = require('request-promise');

function getChannelMessages(count, oldest) {
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
//getChannelMessages(3,1501770200.477992);

var getfeedback = {
    getChannelMessages: getChannelMessages
}

module.exports.getfeedback = getfeedback;