// db/knex.js
const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development); // or .production based on your env

module.exports = db;
