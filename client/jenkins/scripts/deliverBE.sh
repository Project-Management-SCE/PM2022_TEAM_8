set -x
cd server
node index.js &
sleep 1
echo $! > .pidfile
set +x

