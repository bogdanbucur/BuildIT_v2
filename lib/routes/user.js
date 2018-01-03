const { isLoggedIn, isNotLoggedIn } = require('../modules/logged-or-not');
const { permissionCodes } = require('../constants');
const authGuard = require('../modules/auth-guard');

const express = require('express');

const commander = require('../command-bus');
const env = require('../config/env');

const asyncMiddleware = require('../helpers/async-middleware');
const usersRepo = require('../repositories/users');

const router = express.Router();

router.get('/logout', isLoggedIn, (req, res) => {
    if (req.user) {
        commander.handle(commander.commands.LOGOUT_USER, { req }, {
            userId: req.user.user_id,
            rememberMeCookie: req.cookies[env.REMEMBER_ME_COOKIE_NAME],
        });
    }

    req.session.destroy(() => {
        res.clearCookie(env.SESSION_COOKIE_NAME);
        res.clearCookie(env.REMEMBER_ME_COOKIE_NAME);

        res.redirect('/');
    });
});

router.get('/profile', isLoggedIn, asyncMiddleware(async (req, res, next) => res.render('user/profile', {
    title: 'BuildIT - User profile',
    locals: res.locals,
})));

router.post('/update-profile', isLoggedIn, asyncMiddleware(async (req, res, next) => {
    const userUpdated = await await commander.handle(commander.commands.UPDATE_USER_PROFILE, {}, { user: req.user, body: req.body });

    req.session.flash.messages.push({
        type: userUpdated.type,
        message: userUpdated.message,
    });

    return res.redirect('/user/profile');
}));

router.get('/list', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_USERS }), asyncMiddleware(async (req, res, next) => res.render('user/list', {
    title: 'BuildIT',
    locals: res.locals,
})));

router.get('/data', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_USERS }), asyncMiddleware(async (req, res, next) => {
    let datatable = req.query.datatable;
    console.log(datatable.query);
    if (datatable.sort.field === 'ShipDate') {
        datatable.sort.field = null;
    }

    if (datatable.query) {
        if (datatable.query.activated === '') {
            delete datatable.query.activated;
        }
        if (datatable.query['role.role_code'] === '') {
            delete datatable.query['role.role_code'];
        }
    }
    const { queryResult, countQueryResult } = await usersRepo.getPagedUsersWithRoles(datatable);

    return res.json({
        meta: {
            field: datatable.sort.field,
            page: datatable.pagination.page,
            pages: Math.ceil(countQueryResult / 10),
            perpage: datatable.pagination.perpage,
            sort: datatable.sort.sort,
            total: countQueryResult,
        },
        data: queryResult,
    });
}));

module.exports = router;