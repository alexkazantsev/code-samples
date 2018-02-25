import { createConnection, Connection, Entity } from 'typeorm';

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './../config';

class Provider {

  public connection: Connection;

  public connect(entities: string[]): Promise<Connection> {
    return createConnection({
        entities,
        synchronize: true,
        type: 'mysql',
        host: DB_HOST,
        port: +DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        logging: true,
    }).then((conn: Connection) => {
      this.connection = conn;
      return conn;
    });
  }
}

export const DataProvider = new Provider();
