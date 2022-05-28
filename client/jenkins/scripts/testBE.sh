cd server
set -x
npm ls --global --quiet
npm test
npm install --no-save eslint-nibble 
npm run nibble

