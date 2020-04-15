# Builds a Docker to deliver dist/
FROM node:10.16.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g ts-node typescript@3.5.3 pm2@2.10.2 jest @gapi/cli pm2-docker

COPY package.json package.json

RUN npm install

ENV NODE_ENV=production 

COPY . .

CMD [ "gapi", "start", "--prod", "--docker" ]