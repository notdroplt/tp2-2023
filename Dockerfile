FROM alpine:edge 

WORKDIR /app

ENV PORT=3000

EXPOSE 3000

RUN apk update && apk upgrade

RUN apk add nodejs npm sqlite

COPY . .

RUN npm install 

RUN npm install sqlite3

RUN npm rebuild 

ENTRYPOINT [ "node", "." ]