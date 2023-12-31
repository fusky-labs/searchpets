FROM ubuntu:latest

WORKDIR /app

COPY package.json .
COPY python ./python

