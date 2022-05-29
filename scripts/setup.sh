#!/bin/bash

yarn install

cd app

yarn install

cd ..

cd server

pip install -r requirements.txt

python gen.py

echo Done! Start the development server by running `yarn dev`.
