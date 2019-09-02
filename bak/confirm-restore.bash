#!/bin/bash
# $1 is the backup tar.gz to test
# $1 is just the filename

docker container stop baktest
docker container rm baktest
docker volume rm testvol
docker volume create testvol
docker run -it --rm \
-v testvol:/data/db -v $(pwd)/tar/:/mybackups:ro \
debian:bullseye-slim \
tar xzvfC /mybackups/$1 /data/db
docker run -d --name baktest \
-v testvol:/data/db \
mongo
sleep 10s
docker exec -it baktest mongo
docker container stop baktest
docker container rm baktest
docker volume rm testvol
