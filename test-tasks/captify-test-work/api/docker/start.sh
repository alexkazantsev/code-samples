#!/bin/bash

set -e

echo "Starting the app..."

npm run lint
npm run test:cov
npm run start:prod
