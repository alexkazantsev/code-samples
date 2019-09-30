FROM node:12

WORKDIR /var/www/api_v1
ADD package.json /var/www/api_v1
ADD yarn.lock /var/www/v
RUN yarn install

ADD . /var/www/api_v1

RUN yarn build

EXPOSE 3001

CMD ["docker/start.sh"]
