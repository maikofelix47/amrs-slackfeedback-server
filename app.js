const Hapi = require('hapi');
const rp = require('request-promise');
const WebClient = require('@slack/client').WebClient;
const Promise = require("bluebird");
const slackconfig = require('./config/slackconfig');
const slackfeedback = require('./slack-user-feedback');

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