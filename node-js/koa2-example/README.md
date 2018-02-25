# Koa v2 using example

### Technologies used:

- [Koa v2](https://github.com/koajs/koa)
- [MySQL](https://www.mysql.com)
- [Sequelize](https://github.com/sequelize/sequelize)
- [Docker](https://www.docker.com)

### Run locally: 

```
  $ npm install
  $ npm start 
```

### Run using Docker:

```
  $ docker build . -t koa2-example
  $ docker run --name safe-js --rm -p 8000:8000 koa2-example
```

### Run using docker-compose:

```
  $ docker-compose up api
```
