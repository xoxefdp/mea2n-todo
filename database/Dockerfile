# #################### STAGE APPLICATION #########################
# FROM alpine:latest

# ENV TERM=linux

# # Change directory so that our commands run inside this new directory
# WORKDIR /workdir

# # Copy dependency definitions
# COPY run.sh /workdir

# # Add alpine community and main repository
# RUN echo 'https://dl-3.alpinelinux.org/alpine/latest-stable/community' >> /etc/apk/repositories
# RUN echo 'https://dl-3.alpinelinux.org/alpine/latest-stable/main' >> /etc/apk/repositories

# # Upgrade packages and install mongodb
# RUN apk upgrade --update \
#     apk add --no-cache mongodb

# # Expose the port the app runs in
# EXPOSE 27017 28017

# VOLUME /data/db

# #
# ENTRYPOINT [ "/workdir/run.sh" ]

# # Serve the app
# CMD [ "/usr/bin/mongod", "--bind_ip", "0.0.0.0" ]


#################### STAGE APPLICATION #########################
FROM mongo:latest

# Expose the port the app runs in
EXPOSE 27017 27018 27019

# Creates volume
VOLUME /data/db

# Serve the app
ENTRYPOINT [ "/usr/bin/mongod", "--bind_ip", "0.0.0.0" ]