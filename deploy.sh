#!/bin/bash

git pull

pm2 delete 0

pm2 start 'node src/index.js'