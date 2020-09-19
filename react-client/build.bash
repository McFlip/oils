#!/bin/bash
# builds a production docker image

# cp .env.production .env
docker build --build-arg DOMAIN=oils.duckdns.org --build-arg ROOT_URL=https://oils.duckdns.org:3000 --build-arg IMG_HOST=https://oils.duckdns.org:3000/images/ -t mcflip/oils -f Dockerfile-production .
docker push mcflip/oils

# copy config to be uploaded to server
cp ../docker-compose-nginx.yml ../dist

# reset env
# cp .env.dev .env