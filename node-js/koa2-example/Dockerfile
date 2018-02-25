FROM node:9

WORKDIR /var/www/koa2-example

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install

COPY . /var/www/koa2-example
RUN npm run build

EXPOSE 8000

CMD ["node", "./build/index.js"]
