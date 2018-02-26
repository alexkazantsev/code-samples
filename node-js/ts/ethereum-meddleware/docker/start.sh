#!/bin/bash

# Make migrations
# node_modules/.bin/ts-node node_modules/typeorm/cli.js migrations:run --cf ormconfig.js

if [ "$NODE_ENV" = "development" ]; then
  npm run dev
elif [ "$NODE_ENV" = "production" ]; then
  npm start
else
  # Remove it later
  npm start
fi
