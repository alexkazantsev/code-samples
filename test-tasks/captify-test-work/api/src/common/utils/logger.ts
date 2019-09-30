import * as Winston from 'winston';

export const logger = Winston.createLogger({
  transports: [new Winston.transports.Console()],
  level: 'debug',
});
