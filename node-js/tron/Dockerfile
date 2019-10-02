FROM node:12

WORKDIR /var/www/tron_api
ADD package.json /var/www/tron_api
ADD yarn.lock /var/www/tron_api
RUN yarn install

ADD . /var/www/tron_api

EXPOSE 3000

CMD ["docker/start.sh"]
