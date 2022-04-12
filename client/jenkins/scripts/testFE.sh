#!/usr/bin/env sh
cd client
set -x
npm install --save-dev cross-env
set +x
npm test
