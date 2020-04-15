#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #
    sleep 40
    nvm install 10.16.0
    nvm use 10.16.0
    nvm alias default 10.16.0
    cd /root
    git clone https://github.com/Stradivario/graphql-dispatcher.git
    cd graphql-dispatcher
    npm install
    node ./dist/main.js &
}
# this ensures the entire script is downloaded #
