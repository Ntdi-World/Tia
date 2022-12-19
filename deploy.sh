#!/bin/bash

git pulld

pm2 delete 0

pm2 start 'node src/index.js'