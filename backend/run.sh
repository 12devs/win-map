#!/bin/bash

docker run \
  --name bct-ico-parsers-backend \
  --restart=always \
  --add-host rabbitmqd:15.0.1.239 \
  --add-host redisd:15.0.1.101 \
  --add-host mongod:15.0.1.9 \
  -p 8081:8081 \
  -e NODE_ENV=production \
  -dit hub.cgblockchain.com/bct-ico-parsers/backend
