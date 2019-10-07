#!/bin/bash

# source DB login info from .env file
export $(cat ../.env)
# daily rotating backup
docker exec -it mongo-db mongodump --db mean-docker --dumpDbUsersAndRoles --authenticationDatabase admin --username $DB_ADMIN_UNAME --password $DB_ADMIN_PW --out /dump/$(date +%a)/
# dump out just data without users
# docker exec -it mongo-db mongodump --db mean-docker --username $DB_UNAME --password $DB_PW --out /dump/$(date +%a)/