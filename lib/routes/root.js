const { isLoggedIn, isNotLoggedIn } = require('../modules/logged-or-not');
// const { isEmail } = require('validator');
const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');
const { isProperPassword, isPasswordMatch } = require('../helpers/password-validator');

const express = require('express');

const passport = require('../auth/strategies/local-authenticator');
const logger = require('../helpers/logger');
const env = require('../config/env');
const commander = require('../command-bus');

const asyncMiddleware = require('../helpers/async-middleware');
const { usersRepo } = require('../repositories/users');

const router = express.Router();

router.get('/404', asyncMiddleware(async (req, res, next) => res.render('404', {
    title: 'Page not found!',
    layout: false,
})));

router.get('/', isNotLoggedIn, asyncMiddleware(async (req, res ,next) => res.render('login-page', {
    title: 'BuildIT - Login Page',
    layout: false
})));

router.post(
    '/login', isNotLoggedIn, passport.authenticate('local', {
        failureFlash: true,
        failWithError: true,
    }),

    (req, res, next) => {
        if (!req.body.remember) {
            return res.redirect('/home');
        }

        return commander.handle(commander.commands.SET_USER_REMEMBER_ME, { req, res })
            .then((cookie) => {
                res.cookie(env.REMEMBER_ME_COOKIE_NAME, cookie, {
                    maxAge: parseInt(env.REMEMBER_ME_COOKIE_MAX_AGE_MS, 10),
                    httpOnly: true,
                });
                res.redirect('/home');
                return null;
            })
            .catch(next);
    },

    (err, req, res, next) => {
        // We only handle authentication errors here, the rest gets shipped to the default error handler
        // further down the line
        if (err.name === 'AuthenticationError') {
            logger.info('Authentication error, redirecting to login page');
            return res.redirect('/');
        }
        // Handle error somewhere else, buddy
        return next(err);
    },
);

router.post('/register', asyncMiddleware(async (req, res, next) => {
    setRequestErrorIfValidationFails(req, () => isPasswordMatch(req.body.password, req.body.confirm_password), 'password', 'Passwords do not match');
    setRequestErrorIfValidationFails(
        req, isProperPassword, 'password',
        'Password must have at least 8 characters and must contain lower- and upper-case letters, numbers and at least one of the characters !@#$%^&*()_-+=[];:?,.',
    );

    if (!req.isValid) {
        return res.redirect('/');
    }

    const userSaveResult = await commander.handle(commander.commands.CREATE_USER, {}, { user: req.body });

    req.session.flash.messages.push({
        type: userSaveResult.type,
        message: userSaveResult.message,
    });

    if (!userSaveResult.state) {
        return res.redirect('/');
    }

    return res.redirect('/');
}));

router.get('/activate', asyncMiddleware(async (req, res, next) => {
    await commander.handle(commander.commands.ACTIVATE_USER, {}, { activationCode: req.query.code });

    req.session.flash.messages.push({
        type: 'success',
        message: 'You account has been activated and you can now log in',
    });

    return res.redirect('/login');
}));

router.get('/home', isLoggedIn, asyncMiddleware(async (req, res, next) => res.render('index', {
    title: 'BuildIT - Dashboard',
    locals: res.locals,
})));

module.exports = router;