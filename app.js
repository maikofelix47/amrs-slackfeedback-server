
const Hapi = require('hapi');
const rp = require('request-promise');
const WebClient = require('@slack/client').WebClient;
const Promise = require("bluebird");
const slackconfig = require('./slackconfig');
//const slackfeedback = require('./slack-user-feedback');

const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8080,
    routes: {
        json: {
            space: 4
        }
    }
});

function getChannelMessage(count,oldest){
    var options = {
    url: 'https://slack.com/api/channels.history',
    qs: {
        token:  slackconfig.slack.bottoken,
        channel: slackconfig.slack.channelID,
        count: count,
        oldest:oldest
       
     },
    
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
    };
    return new Promise(function(resolve, reject){
        rp(options)
        .then(function(data){
            resolve(data);
            console.log(data);
        }).catch(function (err) {
            reject(err);
            });
        

        });
}
    getChannelMessage(10);

    module.exports;{
    getChannelMessage:getChannelMessage
    }



//register routing plugin
server.register({
    register: require('./app-route'),

}, (err) => {

    if (err) {
        throw err;
        console.log('failed to load routing plugin', err)
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});






