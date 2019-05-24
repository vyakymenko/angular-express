import * as Knex from 'knex';

interface PgSqlConfig {
  development: Knex.Config | string;
  production: Knex.Config | string;
}

export const pgsql: PgSqlConfig = {
  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'angular-express'
    }
  },
  production: {
    client: 'pg',
    version: '7.2',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'angular-express'
    }
  }
};
