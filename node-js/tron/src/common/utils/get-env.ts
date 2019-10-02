import * as Joi from 'joi';
import { envSchema } from '../../config/required-env.config';
import { logger } from './logger';

export const getEnv = () => {
  const { error, value } = Joi.validate(
    process.env,
    envSchema,
    {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    },
  );
  if (error) {
    error.details.map(e => logger.error(e.message));
    process.exit(1);
  }

  return value;
};
