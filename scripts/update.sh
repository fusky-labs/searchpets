#!/bin/bash

# update the repo
git pull --origin main

# make a build
yarn build

# kill all screen sessions
killall screen

# start the server
screen yarn start
