#/bin/bash

# npx babel ./src -d functions/
rm -rf functions
mkdir functions/
cp -r package.json node_modules/ functions/

npx babel ./src/server -d functions/ 
npx babel ./src/client -d functions/src

npx webpack-cli --config webpack.config.js

node functions/index.js 
