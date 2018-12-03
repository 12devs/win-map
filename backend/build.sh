#!/bin/bash

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

docker build -t hub.12devs.com/wind-map/backend .

cd ..
