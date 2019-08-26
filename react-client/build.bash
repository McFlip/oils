#!/bin/bash
# builds a production docker image

cp .env.production .env
docker build -t mcflip/oils -f Dockerfile-production .
docker push mcflip/oils
cp .env.dev .env