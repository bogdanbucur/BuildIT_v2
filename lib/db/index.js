const env = require('../config/env');

const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig[env.NODE_ENV]);

module.exports = knex;