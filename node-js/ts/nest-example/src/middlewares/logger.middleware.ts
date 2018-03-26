import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { logger } from './../utils';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const { method, originalUrl, body } = req;
      logger.info(`${method} ${originalUrl} ${body ? JSON.stringify(body) : undefined}`);
      next();
    };
  }
}
