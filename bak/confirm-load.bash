#!/bin/bash

# $1 is the day of the week to restore
docker container stop baktest
docker container rm baktest
docker volume rm testvol
docker volume create testvol
docker run -d \
-v testvol:/data/db \
-v $(pwd)/bak/tar/$1:/dump \
--name baktest \
mongo
docker exec -it baktest mongorestore -vvvvv /dump/
docker exec -it baktest mongo
docker container stop baktest
docker container rm baktest
docker volume rm testvol
