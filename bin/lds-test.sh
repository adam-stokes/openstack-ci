#!/bin/bash

. ./bin/common.sh

NOW=$(date +"%m-%d-%Y-%H-%M-%S")

mkdir -p ../reports/lds
./node_modules/.bin/mocha dist/tests/landscape.js \
                          -R json \
                          > ../reports/lds/$NOW.json
