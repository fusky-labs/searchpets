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
python3 gen.py

# Install Sharp for image loading for production, build, and start the server
yarn add sharp
yarn build
yarn start
