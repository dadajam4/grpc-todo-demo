FROM node:10.17.0-alpine

# Add Packages
RUN apk update && apk upgrade && apk add git python g++ make tzdata bash libpng libpng-dev jpeg-dev autoconf automake libc6-compat libjpeg-turbo-dev build-base libtool nasm pkgconf && rm -rf /var/cache/apk/*

# Install firebase tools
RUN npm install -g firebase-tools

ENV TZ Asia/Tokyo
WORKDIR /app

EXPOSE 3000
