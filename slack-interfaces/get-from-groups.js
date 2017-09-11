const slackconfig = require('../config/slackconfig.json')
const rp = require('request-promise');
const teamMembers = require('./getTeamMembers');


function getFromGroup(groupname, count, oldest) {
    let groupName = groupname
    return getGroupArray().then((groups) =>{
        groupId = getGroupID(groups,groupName);

        var options = {
            url: 'https://slack.com/api/groups.history',
            qs: {
                token: slackconfig.slack.bottoken,
                channel: groupId,
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

var getgroupfeedback = {
    getFromGroup: getFromGroup,
}

module.exports.getgroupfeedback = getgroupfeedback;