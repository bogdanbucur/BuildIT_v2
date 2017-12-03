require('./node-environment');

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: 'buildit',
            user: 'bogdanbucur',
            password: 'l0standdamnd',
            port: process.env.DATABASE_PORT,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './lib/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './lib/seeds',
        }
    },

    test: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './lib/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './lib/seeds',
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './lib/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './lib/seeds',
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './lib/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './lib/seeds',
        }
    },

};