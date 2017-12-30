
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('user_profile', (table) => {
        table.integer('user_id').unsigned().notNullable();
        table.string('occupation');
        table.string('company_name');
        table.string('phone_number');
        table.string('city');
        table.string('country');
        table.string('facebook');
        table.string('linkedin');
        table.string('twitter');

        table.foreign('user_id').references('user.user_id');
        table.unique('user_id');
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('user_profile');
};
