const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodetask'
  }
});

module.exports = db;