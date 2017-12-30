
exports.up = async function(knex, Promise) {

    await knex.schema.createTable('role', (table) => {
        table.increments('role_id').unsigned().notNullable().primary();
        table.string('description').notNullable();
    });

    await knex.schema.createTable('permission', (table) => {
        table.increments('permission_id').unsigned().notNullable().primary();
        table.string('description').notNullable();
    });

    await knex.schema.createTable('role_permission', (table) => {
        table.integer('role_id').unsigned().notNullable();
        table.integer('permission_id').unsigned().notNullable();

        table.foreign('role_id').references('role.role_id');
        table.foreign('permission_id').references('permission.permission_id');
        table.unique(['role_id', 'permission_id']);
    });

    await knex.schema.createTable('user_role', (table) => {
        table.integer('user_id').unsigned().notNullable();
        table.integer('role_id').unsigned().notNullable();

        table.foreign('user_id').references('user.user_id');
        table.foreign('role_id').references('role.role_id');
        table.unique(['user_id', 'role_id']);
    });

    await knex.schema.createTable('remember_me_cookie', (table) => {
        table.string('cookie').notNullable();
        table.timestamp('creation_date').defaultTo(knex.fn.now());
        table.timestamp('expiration_date').defaultTo(knex.fn.now()).notNullable();
        table.integer('user_id').unsigned().notNullable();

        table.foreign('user_id').references('user.user_id');
        table.unique('cookie');
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('remember_me_cookie');
    await knex.schema.dropTable('user_role');
    await knex.schema.dropTable('roles_permission');
    await knex.schema.dropTable('role');
    await knex.schema.dropTable('permission');
};
