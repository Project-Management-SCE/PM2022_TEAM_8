#!/usr/bin/env sh
cd client
set -x
sleep 5
kill $(cat .pidfile)
