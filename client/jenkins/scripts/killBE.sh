#!/usr/bin/env sh
cd server
set -x
kill $(cat .pidfile)
