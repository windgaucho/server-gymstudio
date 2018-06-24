import knex from 'knex';

const { MYSQL_URL, MYSQL_PORT } = process.env;

export default knex({
  debug: true,
  client: 'mysql',
  connection: {
    host: MYSQL_URL,
    port: MYSQL_PORT,
    user: 'root',
    password: 'root',
    database: 'gymstudio',
  },
  pool: {
    min: 0,
    max: 10,
  },
});
