const WebClient = require('@slack/client').WebClient;
const slackconfig = require('../config/slackconfig.json');


function sendUserFeedBack(message) {

    let token = slackconfig.slack.bottoken;
    let channel = slackconfig.slack.channelID;

    return new Promise(function (resolve, reject) {
        let web = new WebClient(token);
        web.chat.postMessage(channel, message, function(err, res) {
            if (err) {
                console.log('Error:', err);
                resolve({ status: err });
            } else {
                console.log('Message sent: ', res);
                resolve({ status: 'okay' });
            }
        });

    });
}
        var postfeedback = {
            sendUserFeedBack: sendUserFeedBack,
        };

    module.exports.postfeedback = postfeedback;