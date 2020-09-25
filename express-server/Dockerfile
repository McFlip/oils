FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# For webpack to know this is node
ENV BUILD_TARGET server
# Copy dependency definitions and webpack configs
# Don't copy source code for dev because it will be mounted in a volume
COPY package.json package-lock.json webpack.config.common.js webpack.config.server.js .babelrc /usr/src/app/
# Faster than install, since we already built package-lock on host dev system
RUN npm ci
EXPOSE 3000
