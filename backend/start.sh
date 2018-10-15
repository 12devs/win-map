#!/bin/bash

docker rm -f bct-ico-parsers-backend
docker rmi hub.cgblockchain.com/bct-ico-parsers/backend

npm --production=false i
npm run build

./build.sh
./run.sh
