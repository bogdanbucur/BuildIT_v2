exports.up = async function (knex) {
    await knex.schema.createTable('graphics_board', (table) => {
        table.increments('gpu_id').unsigned().notNullable().primary();
        table.string('gpu_name').notNullable();
        table.boolean('gpu_gaming_recommended').default(false);
        table.json('gpu_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('processor', (table) => {
        table.increments('cpu_id').unsigned().notNullable().primary();
        table.string('cpu_name').notNullable();
        table.boolean('cpu_gaming_recommended').default(false);
        table.json('cpu_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('ram_memory', (table) => {
        table.increments('ram_id').unsigned().notNullable().primary();
        table.string('ram_name').notNullable();
        table.boolean('ram_gaming_recommended').default(false);
        table.json('ram_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('motherboard', (table) => {
        table.increments('mobo_id').unsigned().notNullable().primary();
        table.string('mobo_name').notNullable();
        table.boolean('mobo_gaming_recommended').default(false);
        table.json('mobo_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('hard_drive', (table) => {
        table.increments('hdd_id').unsigned().notNullable().primary();
        table.string('hdd_name').notNullable();
        table.json('hdd_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('solid_state_drive', (table) => {
        table.increments('ssd_id').unsigned().notNullable().primary();
        table.string('ssd_name').notNullable();
        table.boolean('ssd_gaming_recommended').default(false);
        table.json('ssd_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('power_supply', (table) => {
        table.increments('power_id').unsigned().notNullable().primary();
        table.string('power_name').notNullable();
        table.boolean('power_gaming_recommended').default(false);
        table.json('power_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('computer_case', (table) => {
        table.increments('case_id').unsigned().notNullable().primary();
        table.string('case_name').notNullable();
        table.boolean('case_gaming_recommended').default(false);
        table.json('case_specs');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('computer_case');
    await knex.schema.dropTable('power_supply');
    await knex.schema.dropTable('solid_state_drive');
    await knex.schema.dropTable('hard_drive');
    await knex.schema.dropTable('motherboard');
    await knex.schema.dropTable('ram_memory');
    await knex.schema.dropTable('processor');
    await knex.schema.dropTable('graphics_board');
};
