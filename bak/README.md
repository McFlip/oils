# Backup and Restore scripts for the MONGODB data volume

## BACKUP

### Full Backup or Migration
This strategy will shut down the server cleanly and conduct a full backup at the file level

`bash backup.bash *docker-compose-file*`

Backs up the database docker volume to a gzipped tar archive

usage: copy to the server and run script
or make this executable and setup a cron job

### Dump
This strategy can run on a live server

`bash dump.bash`

Dumps out the collections in bson with metadata in json

## RESTORE

### New Server or Rebuild
`bash restore.bash *filenameOfTAR* *docker-compose-file*`

1. Stops services according to the compose file
2. Recreates the volume
3. Unpacks the backup into the fresh volume
4. Starts the services again

This script expects the backup archive to be in the `tar` subfolder

### Roll Back to Daily Dump
This strategy can run on a live server. Uses the daily dumps.

`docker exec -it mongo-db mongorestore /dump/`

## TEST

The `confirm-load.bash` script tests the dumps.
The `confirm -restore.bash` script tests the full file backups.

Each one of the tests spins up a new MongoDB container called `baktest` with an attached volume called `testvolume`.
Verify the data by issuing queries on the command line.

Remember to remove `baktest` and `testvolume`.