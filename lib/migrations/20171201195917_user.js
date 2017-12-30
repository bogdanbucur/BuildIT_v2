
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('user', (table) => {
        table.increments('user_id').unsigned().notNullable().primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.unique('email');
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('users');
};
