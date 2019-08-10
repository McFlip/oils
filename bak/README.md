# Backup and Restore scripts for the MONGODB data volume

## BACKUP
`bash backup.bash *docker-compose-file*`

Backs up the database docker volume to a gzipped tar archive

usage: copy to the server and run script
or make this executable and setup a cron job

This strategy will shut down the server cleanly and conduct a full backup at the file level

## RESTORE
`bash restore.bash *filenameOfTAR* *docker-compose-file*`

1. Stops services according to the compose file
2. Recreates the volume
3. Unpacks the backup into the fresh volume
4. Starts the services again

This script expects the backup archive to be in the `tar` subfolder