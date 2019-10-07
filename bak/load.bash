#!/bin/bash
# $1 is the name of the backup dir

# source DB login info from .env file
export $(cat ../.env)
docker exec -it mongo-db mongorestore --db mean-docker --restoreDbUsersAndRoles --authenticationDatabase admin --username $DB_ADMIN_UNAME --password $DB_ADMIN_PW -vvvvv /dump/$1/mean-docker