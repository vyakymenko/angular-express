import * as Knex from 'knex';

interface MySQLConfig {
  development: Knex.Config | string;
  production: Knex.Config | string;
}

export const mysql: MySQLConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'angular-express'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'angular-express'
    }
  }
};
