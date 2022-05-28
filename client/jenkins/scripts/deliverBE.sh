set -x
cd server
node index.js &
sleep 5
echo $! > .pidfile
set +x

