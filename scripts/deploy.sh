#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

# # Git user info configs
# git config --global user.email "carbon@us.ibm.com"
# git config --global user.name "carbon-bot"

# # Add github token to git credentials
# git config credential.helper "store --file=.git/credentials"
# echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null

# echo "Publish to Github"
# git stash

# # checkout master to get out of detached HEAD state
# git checkout master

# lerna version --preid d3v5-latest --no-push

echo "Publish to NPM"

# 	# yarn build

# # # authenticate with the npm registry
# # npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN -q

node scripts/add-telemetry-to-packages.js

lerna publish from-package --yes --force-publish --contents dist --dist-tag d3v5-latest
