# Captify test task

# Task:

### Frontend:

- [x] Simple table with 1 column _(with 3 columns)_
- [x] Textfield with a button to add new row to the table

### Backend:

- [x] Simple API to store table in memory
- [x] Routes to get table and add new row to table _(also edit and delete routes are available)_
- [x] Table cannot store more than 10 records

### Validations:

- [x] Rows should not be affected by xss _(ReactJS is quite safe by design since)_

### Requirements:

- [x] Clear/Modular structure
- [x] React + Express
- [x] Unit tests _(only the backend side)_
- [x] Simple Readme

### Be a plus:

- [x] async/await
- [x] Code style
- [x] Es6+ _(TypeScript)_
- [x] Any npm module can be used
- [ ] Material-ui usage _(Ant Design was used)_
- [x] Build process (application checks lint, tests, starts)

#### Time to complete the task: 2 hours

## Technical stack:

- TypeScript everyware
- NestJS as the main backend framework
- NextJS as the main frontend framework
- Redux
- Ant Design
- Styled Components

## Run (production mode):

### Requirements:

- Docker
- docker-compose

```bash
$ docker-compose up --build web
```

After the docker has completed all the tasks, you should be able to see the working project on [http://localhost](http://localhost)

Api docs should be available on http://localhost/api-docs

## Run (development mode):

### Requirements:

- NodeJS v10+

### Backend:

To run the backend in development mode, you must to setup environment variables: `NODE_ENV=development` and `API_PORT=3001` and run `yarn start:dev` from the `package.json`.

The API will be available on http://localhost:3001/api/v1

The api docs will be available on http://localhost:3001/api-docs

For more commands look at the `package.json` file.

### Frontend: 

To tun the frontend in development mode you must create the `.env` file in the frontend folder and put there environment variable `NODE_ENV=development`. Then just run `yarn dev` command from the `package.json`.

Frontend part should be available on http://localhost:3000
