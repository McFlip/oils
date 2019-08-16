#!/bin/bash
# builds a production docker image

# TODO: cp .env.production .env
# TODO: image tag name
docker build -t oils_front -f Dockerfile-production .
# TODO: push image to dockerhub