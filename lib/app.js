const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const expressWinston = require('express-winston');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const sanitizer = require('express-sanitizer');
const RedisStore = require('connect-redis')(expressSession);
const path = require('path');
const flashes = require('./modules/session-flashes');
const rememberMeCookieAuth = require('./modules/remember-me-cookie-authenticator');
const handleMissingStaticAssets = require('./modules/handle-missing-static-assets');

const env = require('./config/env');

const logger = require('./helpers/logger');
const passport = require('./auth');

// Strategy for authenticating using the remember-me token
require('./auth/strategies/remember-me-authenticator');
// Strategy for authenticating using the username and the password
require('./auth/strategies/local-authenticator');
// We need to set up user (de)serialization from the session
require('./auth/mount-serializer')(passport, require('./auth/serializers/buildit'));

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('env', env.NODE_ENV);
app.use(expressLayouts);

// Trust the first proxy
app.set('trust proxy', 1);

// Place static files before the logger for now until we cna get a correct ignore glob
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));

// Fail fast for static assets
app.use(handleMissingStaticAssets(path.join(__dirname, '../public')));

app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: false,
    msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
    colorize: env.NODE_ENV === 'development',
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sanitizer());

app.use(cookieParser());

// let sessionStore;
// if (process.env.SESSION_REDIS_HOST && process.env.SESSION_REDIS_PORT) {
//     const redisOptions = {
//         host: process.env.SESSION_REDIS_HOST,
//         port: process.env.SESSION_REDIS_PORT,
//     };
//     sessionStore = new RedisStore(redisOptions);
// } else {
//     sessionStore = undefined;
//     logger.warn('Redis store options not found. Defaulting to memory store');
// }

app.use(expressSession({
    // store: sessionStore,
    secret: env.SESSION_COOKIE_SECRET,
    name: env.SESSION_COOKIE_NAME,
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: env.SESSION_COOKIE_SECURE,
        path: env.SESSION_COOKIE_PATH,
        maxAge: parseInt(env.SESSION_COOKIE_MAX_AGE_MS, 10),
        httpOnly: true,
    },
}));

app.use(flashes());
app.use(passport.initialize());
app.use(passport.session());

app.use(rememberMeCookieAuth());

// Mount some user information on the response locals
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user || {};
    next();
});

// Routes
app.use('/', require('./routes/root'));
app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
function redirectUnmatched(req, res) {
    res.redirect('/404');
}

app.use(redirectUnmatched);

app.use(expressWinston.errorLogger({
    winstonInstance: logger,
    colorize: env.NODE_ENV === 'development',
}));

// error handler
// noinspection JSUnusedLocalSymbols
app.use((err, req, res, next) => {
    logger.error('Express error handler reached', err);// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = env.NODE_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { layout: false, error: err, title: 'Error' });
});

app.listen(env.HTTP_SERVER_PORT, env.HTTP_SERVER_ADDRESS, () => {
    logger.info(`Server is listening on ${env.HTTP_SERVER_ADDRESS}:${env.HTTP_SERVER_PORT}`);
});