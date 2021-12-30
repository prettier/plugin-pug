#!/usr/bin/env bash
set -x

# Cleanup
rm -Rf coverage
rm -Rf dist
rm -Rf node_modules
rm pnpm-lock.yaml

set -e

# Prepare
pnpm install
pnpm run lint
pnpm run test -- --silent
pnpm audit --prod

set +e
pnpm audit
set -e

pnpm run build

set +ex

# Publish
echo
echo "Run 'npm publish --dry-run' to test publishing"
echo
echo "If everything looks okay, use 'npm publish --access public'"
echo
echo "Remember to create a tag"
echo "Remember to increase the version number"
echo
