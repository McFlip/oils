#!/bin/bash
# builds a production docker image

# docker login -u mcflip --password-stdin
docker build -t mcflip/oils-backend -f Dockerfile-production .
retcode=$?
if [ $retcode -ne 0 ]
then
    echo "docker build failed"
    exit
fi
docker push mcflip/oils-backend

# copy configs and scripts to be uploaded to server
cd ..
cp docker-compose.yml ./express-server/.env bak/*.bash bak/README.md dist/
cd express-server