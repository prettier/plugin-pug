#!/usr/bin/env bash
set -ex

# Cleanup
rm -Rf coverage
rm -Rf dist
rm -Rf node_modules
rm junit.xml
rm pnpm-lock.yaml

# Prepare
pnpm install
pnpm run lint
pnpm run test -- --silent
pnpm audit
pnpm run build

# Publish
npm publish --dry-run

set +ex

echo
echo "If everything looks okay, use 'npm publish --access public'"
echo
echo "Remember to create a tag"
echo "Remember to increase the version number"
echo
