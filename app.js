const Hapi = require('hapi');

const slackconfig = require('./config/slackconfig');
const slackfeedback = require('./interfaces/slack-user-feedback');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000,
    routes: {
        json: {
            space: 4
        }
    }
});

//register routing  plugin
server.register({
    register: require('./route/app-route'),

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