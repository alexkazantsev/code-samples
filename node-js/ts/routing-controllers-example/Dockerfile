FROM node:latest

RUN npm i -g typescript ts-node

WORKDIR /var/www/rc-api

ADD . /var/www/rc-api

RUN npm install

EXPOSE 8000

CMD ["./node_modules/.bin/ts-node", "./src/index.ts"]

