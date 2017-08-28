const getfeedback = require('../interfaces/get-user-feedback');
const postfeedback = require('../interfaces/postfeedbacktoslack');
const postToAChannel = require('../interfaces/posttochannels');

var getChannelMessage = function(req, reply) {
                const urlparts = req.params.count.split('/');
                var res = getfeedback.getfeedback.getChannelMessages(encodeURIComponent(urlparts[0]),
                         encodeURIComponent(urlparts[1]));
                reply(res); 
                }  

var postSlackFeedback = function (request, reply) {
                var payload = request.payload.message;
                postfeedback.postfeedback.sendUserFeedBack(payload);

                reply('message sent'+' '+ payload);
            }
var postToChannels = function (request, reply) {
                 var payload = request.payload.message;
                 var channel = request.payload.channel;
                 var res =  postToAChannel.postToAChannel.postToChannel(payload,channel);
                 reply('message sent server'+ ' ' + payload);
                // reply(res);
            }

var basePlugin = {

    register: function(server, options, next) {
        var routes = [
        {
            method: 'GET',
            path: '/slackmessages/{count*2}',
            handler: getChannelMessage
        },
        {
            method: 'POST',
            path: '/slackmessages',
            handler: postSlackFeedback
        },
         {
            method: 'POST',
            path: '/sendmessage',
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