FROM alpine:edge 

WORKDIR /app

RUN mkdir build 

RUN apk update && apk upgrade

