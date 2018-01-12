FROM keymetrics/pm2-docker-alpine:7

COPY . /opt/amrs-slackfeedback-server

RUN npm install -g babel-cli

RUN cd /opt/amrs-slackfeedback-server && npm install

CMD ["pm2-docker", "start", "/opt/amrs-slackfeedback-server/config/pm2_config.json" ]