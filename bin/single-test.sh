#!/bin/bash

. ./bin/common.sh

NOW=$(date +"%m-%d-%Y-%H-%M-%S")

mkdir -p ../reports/single
./node_modules/.bin/mocha dist/tests/single.js \
                          -R json \
                          > ../reports/single/$NOW.json
