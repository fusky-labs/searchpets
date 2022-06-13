#!/bin/bash

yarn install

yarn --cwd ./app install

cd ../server

python -m pip install -r requirements.txt

python gen.py

echo "Done! Start the development server by running \"yarn dev\"."
