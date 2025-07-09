require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      port: 5432,
      ssl: { rejectUnauthorized: false }, // Render requires SSL
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
