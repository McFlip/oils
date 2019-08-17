#!/bin/bash
# builds a production docker image

# docker login -u mcflip --password-stdin
cp .env.production .env
docker build -t mcflip/oils-backend -f Dockerfile-production .
docker push mcflip/oils-backend
cp .env.dev .env