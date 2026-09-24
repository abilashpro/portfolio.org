#!/usr/bin/env bash
set -e

npm run build
rm -rf docs
mkdir -p docs
cp -r dist/* docs/

printf '\nBuild output copied to ./docs\n'
printf 'You can now push this to the gh-pages branch or use GitHub Actions.\n'
