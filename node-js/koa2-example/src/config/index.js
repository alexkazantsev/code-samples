const {
  LOG_LEVEL = 'debug',
  NODE_ENV = 'local',
  DB_USER = 'root',
  DB_PASS = 'root',
  DB_NAME = 'example',
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_LOG = true,
  SECRET,
} = process.env;

module.exports = {
  db: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    host: DB_HOST,
    dialect: 'mysql',
    logging: DB_LOG && console.log,
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  },
  LOG_LEVEL,
  NODE_ENV,
  SECRET,
};
