
const getfeedback = require('../public_channels_interfaces/get-user-feedback');
const getchannelfeedback = require('../public_channels_interfaces/get-from-channel');
const postfeedback = require('../public_channels_interfaces/postfeedbacktoslack');
const postToAChannel = require('../public_channels_interfaces/posttochannels');

var getChannelMessage = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getfeedback.getfeedback.getChannelMessages(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]));
                reply(res); 
                } 
var getFromChannel = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getchannelfeedback.getchannelfeedback.getFromChannel(encodeURIComponent(urlparts[0]),
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
                 postToAChannel.postToAChannel.postToChannel(payload,channel).then(function(success) {
                    reply(success);
                    console.log('message send:' + ' ' + payload);
                }).catch((err) => {
                        reply(Boom.badData(error));
                });
                
            }

var basePlugin = {

    register: function(server, options, next) {
        var routes = [
        {
            method: 'GET',
            path: '/public/slackmessages/{count*2}',
            handler: getChannelMessage
        },
        {
            method: 'GET',
            path: '/public/slackmessages/{count*3}',
            handler: getFromChannel
        },
        {
            method: 'POST',
            path: '/public/postmessage',
            handler: postSlackFeedback
        },
        {
            method: 'POST',
            path: '/public/sendmessage',
            handler: postToChannels
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