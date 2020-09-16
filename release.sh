#!/usr/bin/env bash
set -x

# Cleanup
rm -Rf coverage
rm -Rf dist
rm -Rf node_modules
rm junit.xml
rm yarn.lock

# Prepare
yarn install
yarn lint
yarn test --silent
yarn audit --groups dependencies
yarn audit --groups peerDependencies
yarn build

# Publish
npm publish --dry-run

set +x

echo
echo "If everything looks okay, use 'npm publish --access public'"
echo
echo "Remember to create a tag"
echo "Remember to increase the version number"
echo
