exports.up = async function (knex) {
    await knex.schema.createTable('graphics_board', (table) => {
        table.increments('gpu_id').unsigned().notNullable().primary();
        table.string('gpu_name').notNullable();
        table.string('gpu_interface');
        table.string('gpu_max_resolution');
        table.string('gpu_model');
        table.boolean('gpu_gaming_recommended').default(false);
        table.string('gpu_chipset_producer');
        table.string('gpu_chipset_technology');
        table.float('gpu_chipset_pixel_version');
        table.float('gpu_chipset_shader_version');
        table.string('gpu_memory_type');
        table.string('gpu_memory_size');
        table.string('gpu_memory_bus');
        table.string('gpu_memory_frequency');
        table.string('gpu_support_directx');
        table.string('gpu_support_opengl');
        table.string('gpu_support_opencl');
        table.string('gpu_support_vulkan');
        table.string('gpu_support_vr_ready');
        table.integer('gpu_ports_dvi');
        table.integer('gpu_ports_hdmi');
        table.integer('gpu_ports_display_port');
        table.string('gpu_cooling_system');
        table.string('gpu_cooling_size');
        table.string('gpu_cooling_type');
        table.json('gpu_technologies');
        table.string('gpu_size');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('processor', (table) => {
        table.increments('cpu_id').unsigned().notNullable().primary();
        table.string('cpu_name').notNullable();
        table.boolean('cpu_gaming_recommended').default(false);
        table.string('cpu_socket');
        table.string('cpu_series');
        table.string('cpu_core').default('Not specified');
        table.integer('cpu_cores');
        table.integer('cpu_threads');
        table.string('cpu_frequency');
        table.string('cpu_frequency_turbo');
        table.string('cpu_cache');
        table.string('cpu_technology');
        table.string('cpu_power');
        table.boolean('cpu_included_cooler').default(false);
        table.string('cpu_memory_supported');
        table.string('cpu_max_memory_size');
        table.string('cpu_memory_frequency');
        table.string('cpu_memory_support');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('ram_memory', (table) => {
        table.increments('ram_id').unsigned().notNullable().primary();
        table.string('ram_name').notNullable();
        table.boolean('ram_gaming_recommended').default(false);
        table.string('ram_series');
        table.string('ram_type');
        table.string('ram_size');
        table.string('ram_frequency');
        table.string('ram_latency');
        table.string('ram_radiator');
        table.string('ram_standard');
        table.string('ram_power');
        table.string('timing').default('Not specified');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });

    await knex.schema.createTable('motherboard', (table) => {
        table.increments('mobo_id').unsigned().notNullable().primary();
        table.string('mobo_name').notNullable();
        table.boolean('mobo_gaming_recommended').default(false);
        table.string('mobo_format');
        table.string('mobo_cpu_socket');
        table.string('ram_size');
        table.string('ram_frequency');
        table.string('ram_latency');
        table.string('ram_radiator');
        table.string('ram_standard');
        table.string('ram_power');
        table.string('timing').default('Not specified');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

        table.boolean('active').notNullable().default(true);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('ram_memory');
    await knex.schema.dropTable('processor');
    await knex.schema.dropTable('graphics_board');
};
