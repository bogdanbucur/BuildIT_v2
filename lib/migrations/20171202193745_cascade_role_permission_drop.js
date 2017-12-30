
exports.up = async function up(knex) {
    await knex.schema.table('user_role', (table) => {
        table.dropForeign('role_code');
        table.foreign('role_code').references('role.role_code').onUpdate('CASCADE').onDelete('CASCADE');
    });

    await knex.schema.table('role_permission', (table) => {
        table.dropForeign('role_code');
        table.dropForeign('permission_code');
        table.foreign('role_code').references('role.role_code').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('permission_code').references('permission.permission_code').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = async function down(knex) {
    await knex.schema.table('user_role', (table) => {
        table.dropForeign('role_code');
        table.foreign('role_code').references('role.role_code').onUpdate('CASCADE');
    });

    await knex.schema.table('role_permission', (table) => {
        table.dropForeign('role_code');
        table.dropForeign('permission_code');
        table.foreign('role_code').references('role.role_code').onUpdate('CASCADE');
        table.foreign('permission_code').references('permission.permission_code').onUpdate('CASCADE');
    });
};
