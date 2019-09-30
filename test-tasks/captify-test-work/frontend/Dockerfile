FROM node:12

WORKDIR /var/www/frontend/
ADD package.json /var/www/frontend
ADD yarn.lock /var/www/frontend
RUN yarn install

ADD . /var/www/frontend

RUN touch .env
RUN echo 'API_URL=http://localhost/api/v1' > .env

RUN yarn build

EXPOSE 3000

CMD npm start
