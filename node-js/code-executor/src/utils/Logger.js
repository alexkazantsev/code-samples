const winston = require('winston');
const { ENV_VARIABLES } = require('./../config');

class Logger extends winston.Logger {
  /**
   * @param {Object} config 
   * @returns {winston.Logger}
   */
  constructor(label = 'Logger', json = false) {
    super({
      transports: [new winston.transports.Console({
        timestamp: true,
        showLevel: true,
        colorize: true,
        prettyPrint: true,
        json,
        label,
      })],
      level: ENV_VARIABLES.LOG_LEVEL,
    });
  }
}

module.exports = Logger;
