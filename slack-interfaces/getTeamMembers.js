const slackconfig = require('../config/slackconfig');
const rp = require('request-promise');

function  getGroups() {
    var urlList = 'https://slack.com/api/groups.list?token=' + slackconfig.slack.grouptoken + '&pretty=1';
    return new Promise(function(resolve, reject) {
        rp(urlList)
        .then(function(data) {
            resolve(JSON.parse(data));
        }).catch(function(err) {
            reject(err);
        });
   });
}

function  getChannels() {
    var urlList = 'https://slack.com/api/channels.list?token=' + slackconfig.slack.bottoken + '&pretty=1';
    return new Promise(function(resolve, reject) {
        rp(urlList)
        .then(function(data) {
            resolve(JSON.parse(data));
        }).catch(function(err) {
            reject(err);
        });
   });
}

var teamMembers = {
    getChannels:getChannels,
    getGroups:getGroups     
};

module.exports.teamMembers = teamMembers;