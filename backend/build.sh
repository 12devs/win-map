#!/bin/bash

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

docker build -t hub.cgblockchain.com/bct-ico-parsers/backend .

cd ..
