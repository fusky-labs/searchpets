#!/bin/bash
breakline="============"
wsp=""

yarn install
npx concurrently "yarn --cwd ./app install" "cd server && python -m pip install -r requirements.txt"
echo $wsp
echo $breakline
echo "Done! Start the development server by running \"yarn dev\" or \"npm run dev\""
echo "Or run the website only with \"yarn dev:next\" or \"npm run dev:next\""
echo $breakline
echo $wsp
