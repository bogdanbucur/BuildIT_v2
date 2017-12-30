
exports.up = async function(knex, Promise) {
    if (await knex.schema.hasColumn('user', 'activated')) {
        return Promise.resolve();
    }

    await knex.schema.table('user', (table) => {
        table.integer('activated', 1);

        table.unique('activated');
    });

    return Promise.resolve();
};

exports.down = async function(knex, Promise) {
    return Promise.resolve();
};
