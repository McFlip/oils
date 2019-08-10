#!/bin/bash

docker-compose -f $1 stop
docker container rm mongo-db
docker volume rm oils_dbvol
docker volume create oils_dbvol
docker run -it --rm -v oils_dbvol:/data/db -v $(pwd)/tar/:/mybackups:ro \
debian:bullseye-slim \
tar xzvfC /mybackups/$2 /data/db
docker-compose -f $1 up
