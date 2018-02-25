FROM node:9

COPY . /var/www/build/

WORKDIR /var/www/build/

RUN \
   yarn &&\
   npm run build

CMD cp -r /var/www/build/static/* /var/www/front/static/ && npm start
