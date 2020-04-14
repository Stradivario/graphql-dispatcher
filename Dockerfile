# Builds a Docker to deliver dist/
FROM node:10.16.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g ts-node typescript@3.5.3 pm2@2.10.2 jest @gapi/cli pm2-docker yarn @rxdi/bolt @rxdi/monorepo

COPY package.json package.json

RUN bolt install

ENV NODE_ENV=production 

COPY . .

CMD [ "gapi", "start", "--prod", "--docker" ]