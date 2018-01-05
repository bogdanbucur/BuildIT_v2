exports.up = async function (knex) {
    await knex.schema.createTable('graphics_board_image', (table) => {
        table.increments('gpu_image_id').unsigned().notNullable().primary();
        table.string('gpu_image_path').notNullable();

        table.integer('gpu_id').unsigned().notNullable();

        table.foreign('gpu_id').references('graphics_board.gpu_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('processor_image', (table) => {
        table.increments('cpu_image_id').unsigned().notNullable().primary();
        table.string('cpu_image_path').notNullable();

        table.integer('cpu_id').unsigned().notNullable();

        table.foreign('cpu_id').references('processor.cpu_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('ram_memory_image', (table) => {
        table.increments('ram_image_id').unsigned().notNullable().primary();
        table.string('ram_image_path').notNullable();

        table.integer('ram_id').unsigned().notNullable();

        table.foreign('ram_id').references('ram_memory.ram_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('motherboard_image', (table) => {
        table.increments('mobo_image_id').unsigned().notNullable().primary();
        table.string('mobo_image_path').notNullable();

        table.integer('mobo_id').unsigned().notNullable();

        table.foreign('mobo_id').references('motherboard.mobo_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('hard_drive_image', (table) => {
        table.increments('hdd_image_id').unsigned().notNullable().primary();
        table.string('hdd_image_name').notNullable();

        table.integer('hdd_id').unsigned().notNullable();

        table.foreign('hdd_id').references('hard_drive.hdd_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('solid_state_drive_image', (table) => {
        table.increments('ssd_image_id').unsigned().notNullable().primary();
        table.string('ssd__image_path').notNullable();

        table.integer('ssd_id').unsigned().notNullable();

        table.foreign('ssd_id').references('solid_state_drive.ssd_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('power_supply_image', (table) => {
        table.increments('power_image_id').unsigned().notNullable().primary();
        table.string('power_image_path').notNullable();

        table.integer('power_id').unsigned().notNullable();

        table.foreign('power_id').references('power_supply.power_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('computer_case_image', (table) => {
        table.increments('case_image_id').unsigned().notNullable().primary();
        table.string('case_image_path').notNullable();

        table.integer('case_id').unsigned().notNullable();

        table.foreign('case_id').references('computer_case.case_id');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('computer_case_image');
    await knex.schema.dropTable('power_supply_image');
    await knex.schema.dropTable('solid_state_drive_image');
    await knex.schema.dropTable('hard_drive_image');
    await knex.schema.dropTable('motherboard_image');
    await knex.schema.dropTable('ram_memory_image');
    await knex.schema.dropTable('processor_image');
    await knex.schema.dropTable('graphics_board_image');
};
