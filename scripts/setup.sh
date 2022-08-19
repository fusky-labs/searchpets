#!/bin/bash

yarn install
npx concurrently "yarn --cwd ./app install" "cd server; python -m pip install -r requirements.txt"
echo "Done! Start the development server by running \"yarn dev\"."
