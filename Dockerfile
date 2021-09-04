FROM node:12-alpine

WORKDIR /usr/src/poc-user-feedback

COPY package*.json ./

COPY . /

RUN npm install -g babel-cli

RUN npm install

EXPOSE 80

CMD ["node", "app.js" ]