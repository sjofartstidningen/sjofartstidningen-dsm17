#!/usr/bin/env bash

set -e

./node_modules/.bin/now deploy --dotenv
DEPLOY_URL=$(pbpaste)
./node_modules/.bin/now alias ${DEPLOY_URL} sst-at-dsm17
