
Amrs slack srever is a node project using hapi and consumed by etl rest server. It is used to interract with slack channels to post and retrieve messages.
To setup the project run

$ git clone https://github.com/AMPATH/amrs-slackfeedback-server.git

$ cd amrs-slackfeedback-server

$ npm install

$ mkdir conf && cd conf

Create a config.json file

$ cat config.json

With the following content

{
  	"slack": {
  		"clientID": "",
  		"secret": "",
  		"bottoken": "",
  		"groupid": "",
  		"groupname": "",
  		"channelID": "",
  		"channelname": ""

	  },
	   "slackserver":{
			"host":"The IP or hostname of the server running arms-slack-server",
			"port":5000
			}


}


node app.js or nodemon app.js to run the server in watch mode

Now visit https://<Your Host>:5000 You should see the welcome message

Welcome to Amrs Slack Server

The following descriptions shows how to  interract with the server after running it.

=>To post messages to POC user feedback channel s
    message   format
        {

        "name": "",
        "location": "",
        "phone": "",
        "message": ""


        }
    URL: http://localhost:5000/posttopoc

=>To retrieve messages from POC user feedback channel use the following url and specify these path parameters.

      URL: http://localhost:5000/pocfeedback/{count}/{oldest-timestamp}

=>To post messages to a particular public slack channel

    message   format
        {

        "name": "",
        "location": "",
        "phone": "",
        "message": "",
        "channel":""


        }
    URL: http://localhost:5000/posttochannel

=>To post messages to a particular private slack channel

    message   format
        {

        "name": "",
        "location": "",
        "phone": "",
        "message": "",
        "group":""


        }
    URL: http://localhost:5000/posttogroup


=>To retrieve messages from a particular public slack channel
    URL:http://localhost:5000/channel-slackmessages/{channel-name}/{count}/{oldest-timestamp}

=>To retrieve messages from a particular private slack channel
    URL:http://localhost:5000/group-slackmessages/{group-name}/{count}/{oldest-timestamp}
