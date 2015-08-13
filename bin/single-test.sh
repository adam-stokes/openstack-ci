#!/bin/bash

. ./bin/common.sh

NOW=$(date +"%m-%d-%Y-%H-%M-%S")

mkdir -p ../reports/single

./node_modules/.bin/babel src --out-dir dist
./node_modules/.bin/mocha dist/tests/single.js \
                          --reporter mochawesome \
                          --reporter-options reportDir="$HOME/reports/single/$NOW",reportName="index",reportTitle="Single Installer Testing"


cpLogs "single" $NOW
