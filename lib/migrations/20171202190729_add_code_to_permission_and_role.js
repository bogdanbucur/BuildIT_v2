
exports.up = async function up(knex) {
    if (await knex.schema.hasColumn('role', 'role_code')) {
        return Promise.resolve();
    }

    await knex.schema.table('role', (table) => {
        table.string('role_code', 50);

        table.unique('role_code');
    });

    await knex('role').update('role_code', knex.raw('role_id'));

    await knex.schema.table('user_role', (table) => {
        table.string('role_code', 50);
        table.foreign('role_code').references('role.role_code').onUpdate('CASCADE');
    });

    await knex('user_role').update('role_code', knex.raw('role_id'));

    await knex.schema.table('role_permission', (table) => {
        table.string('role_code', 50);
        table.foreign('role_code').references('role.role_code').onUpdate('CASCADE');
    });

    await knex('role_permission').update('role_code', knex.raw('role_id'));

    await knex.schema.table('user_role', (table) => {
        table.dropColumn('role_id');
        table.string('role_code', 50).notNullable().alter();

        table.primary(['user_id', 'role_code']);
    });

    await knex.schema.table('role_permission', (table) => {
        table.dropColumn('role_id');
        table.string('role_code', 50).notNullable().alter();

        table.primary(['role_code', 'permission_id']);
    });

    await knex.schema.table('role', (table) => {
        table.dropColumn('role_id');

        table.string('role_code', 50).notNullable().alter();
        table.primary('role_code');
    });

    return Promise.resolve();
};

exports.down = async function down() {
    return Promise.resolve();
};
