FROM alpine:edge 

WORKDIR /app

ENV PORT=3000

EXPOSE $PORT

RUN apk update && apk upgrade

RUN apk add nodejs npm

COPY . .

RUN npm install 


