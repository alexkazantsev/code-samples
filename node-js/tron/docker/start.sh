#!/bin/bash

echo "Starting the app..."

# NOTE: Use "local" environment only for local development
if [[ "$NODE_ENV" = "local" ]]; then
    npm run start:dev
else
    npm run start:prod
fi
