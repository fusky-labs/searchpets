#!/bin/bash

yarn install; yarn prepare
npx concurrently "yarn --cwd ./app install" "cd server; python -m pip install -r requirements.txt"
echo "Done! Start the development server by running \"yarn dev\"."
