#!/bin/bash

files=("node_modules" "./app/node_modules" "./server/__pycache__")

for i in "${files[@]}"; do
	rm -rf $i
done

yarn install
yarn --cwd ./app install
