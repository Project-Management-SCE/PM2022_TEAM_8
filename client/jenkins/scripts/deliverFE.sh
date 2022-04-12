
set -x
cd client
npm run build
set +x
set -x
npm start
echo $! > .pidfile
set +x

