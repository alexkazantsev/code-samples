import Ajv from 'ajv';
import Boom from 'boom';

export const validator = schema => {
  const ajv = new Ajv();

  return async (ctx, next) => {
    const valid = ajv.validate(schema, ctx.request.body);
    if (valid) return await next();
    throw Boom.badRequest('Validation error', ajv.errors);
  }
}
