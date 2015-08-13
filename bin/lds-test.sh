#!/bin/bash

. ./bin/common.sh

NOW=$(date +"%m-%d-%Y-%H-%M-%S")

mkdir -p ../reports/lds

./node_modules/.bin/babel src --out-dir dist
./node_modules/.bin/mocha dist/tests/landscape.js \
                          --reporter mochawesome \
                          --reporter-options reportDir="$HOME/reports/lds/$NOW",reportName="index",reportTitle="Landscape Autopilot Testing"

cpLogs "lds" $NOW
