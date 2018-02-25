import winston from 'winston';
import { LOG_LEVEL } from './../config';

const logger = new winston.Logger({
  transports: [new winston.transports.Console({
    timestamp: true,
    showLevel: true,
    colorize: true,
  })],
  level: LOG_LEVEL,
});

export { logger };
