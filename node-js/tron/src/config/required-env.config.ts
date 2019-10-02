import * as Joi from 'joi';

export const envSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(['development', 'production', 'local'])
    .required(),

  API_PORT: Joi.number().required(),
  API_URL: Joi.string().required(),
  PRIVATE_KEY_SHASTA: Joi.string().required(),
});
