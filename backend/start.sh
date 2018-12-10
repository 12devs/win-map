#!/bin/bash

docker rm -f wind-map-backend
docker rmi hub.12devs.com/wind-map/backend

npm --production=false i
npm run build

./build.sh
./run.sh
