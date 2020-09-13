#!/bin/bash
# builds a production docker image

# docker login -u mcflip --password-stdin
cp .env.production .env
docker build -t mcflip/oils-backend -f Dockerfile-production .
docker push mcflip/oils-backend

# copy configs and scripts to be uploaded to server
cd ..
cp docker-compose.yml docker-compose-back.yml .env bak/*.bash bak/README.md dist/

# reset env file
cd express-server
cp .env.dev .env