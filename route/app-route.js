const getfeedback = require('../slack-interfaces/get-user-feedback');
const getchannelfeedback = require('../slack-interfaces/get-from-channel');
const getgroupfeedback = require('../slack-interfaces/get-from-groups');
const postfeedback = require('../slack-interfaces/postfeedbacktoslack');
const postToAChannel = require('../slack-interfaces/posttochannels');
const postToAGroup = require('../slack-interfaces/posttogroups');


var getChannelMessage = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getfeedback.getfeedback.getFromChannel(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]));
                reply(res); 
                } 
var getGroupMessages = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getfeedback.getfeedback.getGroupMessages(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]));
                reply(res); 
                }
var getFromChannel = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getchannelfeedback.getchannelfeedback.getFromChannel(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]),encodeURIComponent(urlparts[2]));
                reply(res); 
                } 
var getFromGroup = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getgroupfeedback.getgroupfeedback.getFromGroup(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]),encodeURIComponent(urlparts[2]));
                reply(res); 
                }            

var postSlackFeedback = function (request, reply) {
                var payload = request.payload.message;
                postfeedback.postfeedback.sendUserFeedBack(payload).then(function(success) {
                    reply(success);
                    console.log('message send' + ' ' + payload);
                }). catch((err) => {
                        reply(Boom.badData(error));
                });
            }
var postToChannels = function (request, reply) {
                var payload = request.payload.message;
                var channel = request.payload.channel;
                var res =  postToAChannel.postToAChannel.postToChannel(payload,channel);
                reply('message sent server'+ ' ' + payload);
                // reply(res);
                
            }
var postToGroup = function (request, reply) {
                var payload = request.payload.message;
                var group = request.payload.group;
                var res =  postToAGroup.postToAGroup.postToGroup(payload,group);
                reply('message sent server to'+group);
                // reply(res);
                
            }           

var basePlugin = {

    register: function(server, options, next) {
        var routes = [
        {
            method: 'GET',
            path: '/channel/slackmessages/{count*2}',
            handler: getChannelMessage
        },
        {
            method: 'GET',
            path: '/group/slackmessages/{count*2}',
            handler: getGroupMessages
        },
        {
            method: 'GET',
            path: '/channel/slackmessages/{count*3}',
            handler: getFromChannel
        },
        {
            method: 'GET',
            path: '/group/slackmessages/{count*3}',
            handler: getFromGroup
        },
        {
            method: 'POST',
            path: '/postmessage',
            handler: postSlackFeedback
        },
        {
            method: 'POST',
            path: '/posttochannel',
            handler: postToChannels
        },
        {
            method: 'POST',
            path: '/posttogroup',
            handler: postToGroup
        }
            ]
        server.route(routes)
        next()
    }
}

basePlugin.register.attributes = {
    pkg: require('../package.json'),
    key: true
};
module.exports = basePlugin;