#!/usr/bin/env sh

echo 'The following command terminates the "npm start" process using its PID'
echo '(written to ".pidfile"), all of which were conducted when "deliverFE.sh"'
echo 'was executed.'
cd server
set -x
ls
kill $(cat .pidfile)
