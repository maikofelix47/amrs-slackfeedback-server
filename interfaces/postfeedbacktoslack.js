var WebClient = require('@slack/client').WebClient;
const slackconfig = require('../config/slackconfig');


function sendUserFeedBack(message) {

    var token = slackconfig.slack.bottoken;
    var channel = slackconfig.slack.channelID;

    var web = new WebClient(token);
    web.chat.postMessage(channel, message, function(err, res) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent: ', res);
        }
    });

}
var postfeedback = {
    sendUserFeedBack: sendUserFeedBack,
};

module.exports.postfeedback = postfeedback;