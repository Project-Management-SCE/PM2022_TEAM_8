#!/usr/bin/env sh
cd client
set -x
ls
kill $(cat .pidfile)
