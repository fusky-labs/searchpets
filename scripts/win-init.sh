#!/bin/bash

cd ..

# Install concurrently lib
yarn install

# Install the Next app
yarn --cwd ./app install

# Install python backend
cd server
pip install -r requirements.txt

# Generate database
python gen.py

yarn build
yarn start
