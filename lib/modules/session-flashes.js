const logger = require('../helpers/logger');

module.exports = function sessionFlashes() {
    return function flashMe(req, res, next) {
        // create flash object to store session flash data OR set to object containing empty messages array and empty prevReq object
        if (!req.flash) {
            req.flash = function requestFlash(type, message) {
                if (req.session && req.session.flash && Array.isArray(req.session.flash.messages)) {
                    req.session.flash.messages.push({
                        type,
                        message,
                    });
                } else {
                    logger.warn('Could not attach flash message to non-existent session', {
                        type,
                        message,
                    });
                }
            };
        }
        req.flash = Object.assign(req.flash, (req.session && req.session.flash) || { messages: [], prevReq: {} });

        // send flash data to locals in the response
        res.locals.flash = req.flash;

        // empty session flash data
        req.session.flash = { messages: [], prevReq: {} };

        // move on to next module
        next();
    };
};