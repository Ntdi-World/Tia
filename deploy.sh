#!/bin/bash

git pull

chmod u+x ./deploy.sh

pm2 delete 0

pm2 start 'node src/index.js'