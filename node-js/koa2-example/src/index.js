import fs from 'fs';
import Koa from 'koa';
import cors from 'koa-cors';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';

import db from './db/models';
import { NODE_ENV } from './config';
import { CatchErrorMiddleware } from './middleware';
import { logger } from './utils';

const API_PORT = 8000;
const app = new Koa();

(async () => {

  try {
    await db.sequelize.authenticate();
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }

  app
    .use(CatchErrorMiddleware)
    .use(convert(cors({ origin: true })))
    .use(koaLogger())
    .use(convert(bodyParser({ jsonLimit: '50mb' })));

  fs.readdirSync(`${__dirname}/modules`).forEach(module => {
    try {
      const __module = require(`${__dirname}/modules/${module}/${module}.router.js`).default;
      app.use(__module);
      logger.info(`LOADED --> ${module} <-- MODULE`);
    } catch (e) {
      logger.warn(`Error, while loading ${module}`, e);
    }
  });

  app.listen(API_PORT, () => {
    logger.info(`API IS RUNNING ON PORT: ${API_PORT}`);
    logger.info(`NODE ENVIRONMENT: ${NODE_ENV}`);
  });

})();

