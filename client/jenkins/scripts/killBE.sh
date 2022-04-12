#!/usr/bin/env sh
cd server &
sleep 5
set -x
kill $(cat .pidfile)
