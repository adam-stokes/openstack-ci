#!/bin/bash

. ./bin/common.sh

NOW=$(date +"%m-%d-%Y-%H-%M-%S")

mkdir -p ../reports/multi
./node_modules/.bin/mocha dist/tests/multi.js \
                          -R json \
                          > ../reports/multi/$NOW.json
