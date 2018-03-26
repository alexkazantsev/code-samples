#!/bin/bash

if [ "$NODE_ENV" = "development" ]; then
  npm run start:watch
elif [ "$NODE_ENV" = "production" ]; then
  npm run prestart:prod
  npm run start:prod
fi
