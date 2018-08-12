const cors = require('cors');
const app = require('express')().use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server, { pingInterval: 2000, pingTimeout: 5000 });

const RoomManager = require('./room/RoomManager');
const Logger = require('./utils/Logger');
const { DOCKER_IMAGES } = require('./config');
const Executor = require('./executor/Executor');

const port = process.env.PORT || 3000;
const logger = new Logger('Entrypoint');

Executor.prepare([...DOCKER_IMAGES], error => {
  logger.info('Docker images was successfully prepared');
  server.listen(port, () => {
    logger.info(`Started a new server on ${port} port.`);
    new RoomManager(io).init();
  });
});
