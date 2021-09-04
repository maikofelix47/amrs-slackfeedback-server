FROM node:12-alpine

COPY . /opt/amrs-slackfeedback-server

RUN npm install -g babel-cli

RUN cd /opt/amrs-slackfeedback-server && npm install

EXPOSE 80

CMD ["node", "app.js" ]