#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #
    create_dir() {
        mkdir /home/project
        chmod -R 777 /home/project
    }
    create_git_ignore() {
        echo "node_modules dist .cache" >>/home/project/.gitignore
    }
    install_worker() {
        docker run --restart=always --name my-vs-code -e PASSWORD=123456 -p 80:8443 -p 9000:9000 -v "/home/project:/home/coder/project" rxdi/vs-code --allow-http
    }
    create_dir
    create_git_ignore
    sleep 40
    install_worker
}
# this ensures the entire script is downloaded #
