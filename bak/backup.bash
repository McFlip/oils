#!/bin/bash

docker-compose -f $1 stop
docker run -it --rm --volumes-from mongo-db -v $(pwd)/tar:/backup \
debian:bullseye-slim \
tar czfC /backup/$(date -I).tar.gz /data/db .
docker-compose -f $1 up
