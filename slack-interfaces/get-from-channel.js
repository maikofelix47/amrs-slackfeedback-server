const slackconfig = require('../config/slackconfig.json')
const rp = require('request-promise');
const teamMembers = require('./getTeamMembers');


function getFromChannel(channelname, count, oldest) {
    let channelName = channelname
    return getChannelArray().then((channels) =>{
        channelId =  getChannelID(channels,channelName);

        var options = {
            url: 'https://slack.com/api/groups.history',
            qs: {
                token: slackconfig.slack.bottoken,
                channel: channelId,
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
    });
}

function getChannelArray(){
   let channelArr = []
        return Promise.resolve(teamMembers.teamMembers.getChannels().then((data) =>{
        data.channels.forEach((channel) =>{
            channelArr.push(channel);
        });
         return channelArr;
    }));
   
}
     
function getChannelID(channelArray,name){
    let id = null;
    channelArray.forEach(channel =>{
        if(channel.name==name){
            id=channel.id
        }
    })
    return id;
} 

var getchannelfeedback = {
    getFromChannel: getFromChannel,
}

module.exports.getchannelfeedback = getchannelfeedback;