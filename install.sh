#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #
    sleep 40
    cd /root
    git clone https://github.com/Stradivario/graphql-dispatcher.git
    cd graphql-dispatcher
    npm install
    node ./dist/index.js &
}
# this ensures the entire script is downloaded #
