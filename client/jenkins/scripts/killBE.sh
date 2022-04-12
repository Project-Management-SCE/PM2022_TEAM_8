#!/usr/bin/env sh
cd server
set -x
ls
kill $(cat .pidfile)
