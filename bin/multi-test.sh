#!/bin/bash

. ./bin/common.sh

NOW=$(date +"%m-%d-%Y-%H-%M-%S")

mkdir -p ../reports/multi
if [ ! -f ~/.cloud-install/placements.yaml ]; then
    mkdir -p ~/.cloud-install/
    cp placements/multi.yaml ~/.cloud-install
fi

./node_modules/.bin/babel src --out-dir dist
./node_modules/.bin/mocha dist/tests/multi.js \
                          --reporter mochawesome \
                          --reporter-options reportDir="$HOME/reports/multi/$NOW",reportName="index",reportTitle="Multi Installer Testing"

cpLogs "multi" $NOW
