#!/bin/bash

# TODO: source DB login info from .env file
# daily rotating backup
docker exec -it mongo-db mongodump --db mean-docker --out /dump/$(date +%a)/