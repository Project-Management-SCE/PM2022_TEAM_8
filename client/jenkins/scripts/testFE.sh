#!/usr/bin/env sh
cd client
set -x
npm install --save-dev cross-env
set +x
set -x
npm test
set +x
