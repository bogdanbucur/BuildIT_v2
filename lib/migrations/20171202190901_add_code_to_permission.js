
exports.up = async function up(knex) {
    if (await knex.schema.hasColumn('permission', 'permission_code')) {
        return Promise.resolve();
    }

    await knex.schema.table('permission', (table) => {
        table.string('permission_code', 100);

        table.unique('permission_code');
    });

    await knex('permission').update('permission_code', knex.raw('permission_id'));

    await knex.schema.table('role_permission', (table) => {
        table.string('permission_code', 50);
        table.foreign('permission_code').references('permission.permission_code').onUpdate('CASCADE');
    });

    await knex('role_permission').update('permission_code', knex.raw('permission_id'));

    await knex.schema.table('role_permission', (table) => {
        table.dropColumn('permission_id');
        table.string('permission_code', 100).notNullable().alter();

        table.primary(['role_code', 'permission_code']);
    });

    await knex.schema.table('permission', (table) => {
        table.dropColumn('permission_id');

        table.string('permission_code', 100).notNullable().alter();
        table.primary('permission_code');
    });

    return Promise.resolve();
};

exports.down = async function down() {
    return Promise.resolve();
};
