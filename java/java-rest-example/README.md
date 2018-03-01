# Java/Spring REST API example

### Run without embedded MySQL and docker-compose:

  $ docker build . -t sponsors

  $ docker run --name sponsors -p 8080:8080 -e DB_HOST=%CUSTOM_DB_HOST% -e DB_PORT=%CUSTOM_DB_PORT% -e DB_NAME=%CUSTOM_DB_NAME% -e DB_USERNAME=%CUSTOM_DB_USERNAME% -e DB_PASSWORD=%CUSTOM_DB_PASSWORD% sponsors

### Run as REST API:

  $ docker-compose -d up api

API will be available on 8080 port

### Run as standalone solution:

  $ docker-compose -d up sponsors

Sponsors application will be available on http://localhost:8080/

### Stop:

  $ docker-compose stop sponsors

### Check latest logs:

  $ docker-compose logs

### Check logs in real time:

  $ docker-compose logs -f

### API documentation:

All documentation available on http://localhost:8080/swagger-ui.html
