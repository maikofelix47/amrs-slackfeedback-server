const getfeedback = require('../slack-interfaces/get-poc-feedback');
const getchannelfeedback = require('../slack-interfaces/get-from-channel');
const getgroupfeedback = require('../slack-interfaces/get-from-groups');
const postfeedback = require('../slack-interfaces/postfeedbacktopoc');
const postToAChannel = require('../slack-interfaces/posttochannels');
const postToAGroup = require('../slack-interfaces/posttogroups');


var getChannelMessage = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getfeedback.getfeedback.getFromChannel(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]));
                reply(res); 
                } 
var getPocFeedback = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getfeedback.getfeedback.getPOCFeedback(encodeURIComponent(urlparts[0]),
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
                var payload = request.payload;
                let message = `From:  ${payload.name} \n Location:  ${payload.location} \n Phone:  ${payload.phone} \n Message: \n ${payload.message}`;
                postfeedback.postfeedback.sendUserFeedBack(message).then(function(success) {
                    reply(success);
                    console.log('message send' + ' ' + payload);
                }). catch((err) => {
                        reply(Boom.badData(error));
                });
            }
var postToChannels = function (request, reply) {
                var payload = request.payload;
                var channel = request.payload.channel;
                let message = `From:  ${payload.name} \n Location:  ${payload.location} \n Phone:  ${payload.phone} \n Message: \n ${payload.message}`;
                var res =  postToAChannel.postToAChannel.postToChannel(message,channel);
                reply('message sent server'+ ' ' + payload);
                
            }
var postToGroup = function (request, reply) {
                var payload = request.payload;
                var group = request.payload.group;
                let message =`From:  ${payload.name} \n Location:  ${payload.location} \n Phone:  ${payload.phone} \n Message: \n ${payload.message}`;
                var res =  postToAGroup.postToAGroup.postToGroup(message,group);
                reply('message sent server to'+group);
                
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
            handler: getPocFeedback
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