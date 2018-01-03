require('dotenv').config({ path: `${__dirname}/../../.env` });

// Environment defaults, they all get overridden by process.env
const env = Object.assign({
    // HTTP server listen defaults
    HTTP_SERVER_PORT: 8000,
    HTTP_SERVER_ADDRESS: '127.0.0.1',

    // Database configuration defaults
    DATABASE_NAME: 'buildit',
    DATABASE_HOST: '127.0.0.1',
    DATABASE_USERNAME: 'bogdanbucur',
    DATABASE_PASSWORD: 'l0standdamnd',
    DATABASE_PORT: 5432,
    DATABASE_DIALECT: 'postgres',

    // Default NodeJS environment
    NODE_ENV: 'development',

    // Session cookie
    SESSION_COOKIE_SECRET: 'awesomeness',
    SESSION_COOKIE_NAME: 'buildit.admin',
    SESSION_COOKIE_SECURE: false,
    SESSION_COOKIE_PATH: '/',
    SESSION_COOKIE_MAX_AGE_MS: 30 * 60 * 1000,

    // Remember me cookie
    REMEMBER_ME_COOKIE_NAME: 'buildit.rmc',
    REMEMBER_ME_COOKIE_MAX_AGE_MS: 3600 * 24 * 14 * 1000,

    // Mailgun config defaults
    MG_HOST: 'smtp.mailgun.org',
    MG_PORT: 587,
    MG_USER: 'bogdangabriel194@gmail.com',
    MG_PASS: '7I3JzhfTtYnY',
    MG_NAME: 'mynameis',
    MG_ADDRESS: 'fancy@egypshun.kat',

    // URLs for site and assets
    URL_WEBSITE_ROOT: 'http://127.0.0.1:8000',
    URL_STATIC_ASSETS: 'http://127.0.0.1:8000',

}, process.env);

module.exports = env;