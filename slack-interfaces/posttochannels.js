
const WebClient = require('@slack/client').WebClient;
const slackconfig = require('../config/slackconfig');
const teamMembers = require('./getTeamMembers');

function postToChannel(message, channelname){
    let channelName = channelname
    let token = slackconfig.slack.bottoken;
    getChannelArray().then((channels) =>{
        channel =  getChannelID(channels,channelName);
            return new Promise(function(resolve, reject){
            let web = new WebClient(token);
            if(channel){
               return web.chat.postMessage(channel, message, function(err, res) {
                    if (err) {
                        console.log('Error:', err);
                        resolve({ status: err });
                    } else {
                        console.log('Message sent:' + '' + message);
                        resolve({ status: 'okay' });
                    }
                });
            }
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

var postToAChannel = {
  postToChannel:postToChannel       
};

module.exports.postToAChannel = postToAChannel;
