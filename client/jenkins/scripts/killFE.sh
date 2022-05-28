#!/usr/bin/env sh
cd client
set -x
kill $(cat .pidfile)
