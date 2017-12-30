
exports.up = async function up(knex) {
    await knex.schema.table('user', (table) => {
        table.timestamp('activated_at');
        table.string('activation_code', 100);

        table.unique('activation_code');
    });
};

exports.down = async function down(knex) {
    await knex.schema.table('user', (table) => {
        table.dropColumn('activated_at');
        table.dropColumn('activation_code');
    });
};
