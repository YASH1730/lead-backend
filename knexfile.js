module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'dpg-d1n43nruibrs73e3vj2g-a.oregon-postgres.render.com',
      user: 'admin',
      password: '86jbF51soy6FILOvjvVlFn2zbk25WW2u',
      database: 'leads_7ssa',
      port: 5432,
      ssl: { rejectUnauthorized: false }, // Render requires SSL
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
