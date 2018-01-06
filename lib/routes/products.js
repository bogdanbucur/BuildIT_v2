const { isLoggedIn } = require('../modules/logged-or-not');
const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');

const { permissionCodes } = require('../constants');
const authGuard = require('../modules/auth-guard');

const express = require('express');

const logger = require('../helpers/logger');
const commander = require('../command-bus');

const asyncMiddleware = require('../helpers/async-middleware');
const productsRepo = require('../repositories/products');

const router = express.Router();

router.get('/add-gpu', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'gpu',
        postLink: '/add-gpu'
    };

    return res.render('products/add-product-form', {
        title: 'Graphics Board',
        locals: res.locals,
    });
}));

router.get('/add-cpu', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'cpu',
        postLink: '/add-cpu'
    };

    return res.render('products/add-product-form', {
        title: 'Processor',
        locals: res.locals,
    });
}));

router.get('/add-ram', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'ram',
        postLink: '/add-ram'
    };

    return res.render('products/add-product-form', {
        title: 'RAM Memory',
        locals: res.locals,
    });
}));

router.get('/add-mobo', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'mobo',
        postLink: '/add-mobo'
    };

    return res.render('products/add-product-form', {
        title: 'Motherboard',
        locals: res.locals,
    });
}));

router.get('/add-hdd', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'hdd',
        postLink: '/add-hdd'
    };

    return res.render('products/add-product-form', {
        title: 'Hard Drive',
        locals: res.locals,
    });
}));

router.get('/add-ssd', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'ssd',
        postLink: '/add-ssd'
    };

    return res.render('products/add-product-form', {
        title: 'Solid State Drive',
        locals: res.locals,
    });
}));

router.get('/add-power', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'power',
        postLink: '/add-power'
    };

    return res.render('products/add-product-form', {
        title: 'Power Supply',
        locals: res.locals,
    });
}));

router.get('/add-case', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_PRODUCT }), asyncMiddleware(async (req, res, next) => {
    res.locals.pageSpecific = {
        product: 'case',
        postLink: '/add-case'
    };

    return res.render('products/add-product-form', {
        title: 'Computer Case',
        locals: res.locals,
    });
}));

module.exports = router;