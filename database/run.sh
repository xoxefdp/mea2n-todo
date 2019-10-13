#!/bin/sh

USER_NAME=mongodb
GROUP_NAME=mongodb

# Create a group and user
addgroup -S $GROUP_NAME && adduser -S $USER_NAME -G $GROUP_NAME

# Docker entrypoint (pid 1), run as root
[ "$1" = "/usr/bin/mongod" ] || exec "$@" || exit $?

# Make sure that database is owned by user mongodb
[ "$(stat -c %U /data/db)" = $USER_NAME ] || chown -R $GROUP_NAME:$USER_NAME /data/db

# Drop root privilege (no way back), exec provided command as user mongodb
cmd=exec; for i; do cmd="$cmd '$i'"; done

# exec su -s /bin/sh -c "$cmd" mongodb --httpinterface # compatible up to 3.6
exec su -s /bin/sh -c "$cmd" mongodb