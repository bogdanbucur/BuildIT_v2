module.exports = {
    getRoles,
};

const knex = require('../db');

function getRoles() {
    return knex('roles').select().returning('*').orderBy('description', 'asc');
}