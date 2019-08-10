#!/bin/bash

docker container stop baktest
docker container rm baktest
docker volume rm testvol
docker volume create testvol
docker run -d --name baktest \
-v testvol:/data/db \
--network oils_default \
-p 12345:27017 \
mongo
docker container stop baktest
docker run -it --rm \
--volumes-from baktest -v $(pwd)/tar/:/mybackups:ro \
debian:bullseye-slim \
tar xzvfC /mybackups/$1 /data/db
docker start -a baktest
