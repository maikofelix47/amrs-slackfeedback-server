
//routing plugin
var basePlugin={

    register:function(server, options, next){

        server.route ({
            method:'GET',
            path:'/slackmessages/{count*2}',
            handler: function(req, reply){
                const urlparts = request.params.user.split('/');
                var res = getChannelMessages(encodeURIComponent(urlparts[0]), encodeURIComponent(urlparts[1]));
                reply(res);
            }
        })
        next()
    }
}
basePlugin.register.attributes = {
    pkg: require('./package.json'),
    key: true
    // name: 'myplugin',
    // version: '1.0.0'
};
module.exports = basePlugin;