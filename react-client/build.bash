#!/bin/bash
# builds a production docker image

cp .env.production .env
docker build -t mcflip/oils -f Dockerfile-production .
retcode=$?
if [ $retcode -ne 0 ]
then
    echo "docker build failed"
    exit
fi
docker push mcflip/oils

# copy config to be uploaded to server
cp ../docker-compose-nginx.yml ../dist

# reset env
cp .env.dev .env