import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { logger } from './../utils';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const { method, originalUrl, body } = req;
      const info = {
        METHOD: method,
        PATH: originalUrl,
      } as any;
      console.log(res.statusCode);
      if (!isEmpty(body)) info.BODY = body;
      logger.info(info);
      next();
    };
  }
}
