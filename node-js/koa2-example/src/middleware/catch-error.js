import { logger } from './../utils';

export const CatchErrorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    let payload = e;
    if (e.isBoom) {
      payload = e.output.payload;
      payload.data = e.data;
      ctx.status = payload.statusCode || payload.status || 500;
    } else {
      ctx.status = e.statusCode || e.status || 500;
      payload = e.message ? { error: e.message } : payload;
    }
    logger.error(e);
    ctx.body = payload;
  }
};
