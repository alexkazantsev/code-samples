import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import * as logger from 'koa-logger';

@Middleware({ type: 'before' })
export class KoaLogger implements KoaMiddlewareInterface {

  public async use(context: any, next: (err?: any) => Promise<any>) {
    await logger()(context, next);
  }
}
