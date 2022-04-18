#!/bin/bash

# Install concurrently lib
yarn install

# Install the Next app
yarn --cwd ./app install

# Install python backend
cd server
pip install -r requirements.txt

# Generate database
python3 gen.py

# Start the server
yarn dev