
exports.up = async function(knex, Promise) {
    await knex.schema.alterTable('user', function(t) {
        t.boolean('activated').alter();
    });

    return Promise.resolve();
};

exports.down = async function(knex, Promise) {
    await knex.schema.alterTable('user', function(t) {
        t.integer('activated', 1).alter();
    });

    return Promise.resolve();
};
