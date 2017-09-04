
const WebClient = require('@slack/client').WebClient;
const slackconfig = require('../config/slackconfig');
const teamMembers = require('./getTeamMembers');

function postToGroup(message, groupname){
    let groupName = groupname
    let token = slackconfig.slack.grouptoken;
    getGroupArray().then((groups) =>{
        console.log('groups',groups);
        group =  getGroupID(groups,groupName);
        console.log('gid',group);
            return new Promise(function(resolve, reject){
            let web = new WebClient(token);
            if(group){
               return web.chat.postMessage(group, message, function(err, res) {
                    if (err) {
                        console.log('Error:', err);
                        resolve({ status: err });
                    } else {
                        console.log('Message sent:' + ' ' + message);
                        resolve({ status: 'okay' });
                    }
                });
            }
        });
        
    });
   
}

function getGroupArray(){
   let groupArr = []
        return Promise.resolve(teamMembers.teamMembers.getGroups().then((data) =>{
        data.groups.forEach((group) =>{
            groupArr.push(group);
        });
        return groupArr;
    }));
   
}
     
function getGroupID(groupArray,name){
    let id = null;
    groupArray.forEach(group =>{
        if(group.name==name){
            id=group.id
        }
    })
    return id;
} 

var postToAGroup = {
  postToGroup:postToGroup       
};

module.exports.postToAGroup = postToAGroup;
