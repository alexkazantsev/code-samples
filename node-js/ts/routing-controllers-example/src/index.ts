import 'reflect-metadata';
import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';
import * as parser from 'body-parser';
import { Container } from 'typedi';

import { DataProvider } from './utils';
import { CurrentUser } from './middlewares';

(async function start() {
  try {

    routingUseContainer(Container);
    ormUseContainer(Container);

    await DataProvider.connect([`${__dirname}/models/*.ts`]);

    createExpressServer({
      routePrefix: '/api',
      cors: true,
      defaultErrorHandler: true,
      currentUserChecker: CurrentUser,
      middlewares: [parser({ limit: '10mb' })],
      controllers: [`${__dirname}/controllers/*.ts`],
    }).listen(8000);
  } catch (e) {
    throw new Error(e);
  }
})();
