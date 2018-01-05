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

module.exports = router;