const slackconfig = require('../config/slackconfig.json')
const rp = require('request-promise');

var uri = 'https://slack.com/api/';
function getPOCFeedback(count, oldest) {
    var options = {
        url: uri+ 'groups.history',
        qs: {
            token: slackconfig.slack.grouptoken,
            channel: slackconfig.slack.groupid,
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

function getFromChannel(count, oldest) {
    var options = {
        url: uri+ 'channels.history',
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
    getPOCFeedback:getPOCFeedback,
    getFromChannel:getFromChannel
}

module.exports.getfeedback = getfeedback;