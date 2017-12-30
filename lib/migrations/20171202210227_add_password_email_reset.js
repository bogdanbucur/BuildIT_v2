
exports.up = async function up(knex) {
    await knex.schema.table('user', (table) => {
        table.string('password_reset_code', 100);
        table.timestamp('password_reset_code_expires_at');

        table.string('email_change_confirmation_code', 100);
        table.string('email_change_new_address');
    });
};

exports.down = async function down(knex) {
    await knex.schema.table('user', (table) => {
        table.dropColumn('password_reset_code');
        table.dropColumn('password_reset_code_expires_at');

        table.dropColumn('email_change_confirmation_code');
        table.dropColumn('email_change_new_address');
    });
};
