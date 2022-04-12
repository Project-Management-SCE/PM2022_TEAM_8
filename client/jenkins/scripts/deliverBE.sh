set -x
cd server
node index.js
echo $! > .pidfile
set +x

