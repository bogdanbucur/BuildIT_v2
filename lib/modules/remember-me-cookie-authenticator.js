const passport = require('../auth');
const logger = require('../helpers/logger');

module.exports = function rememberMeCookieAuthBuilder() {
    return function rememberMeCookieAuth(req, res, next) {
        // Already authenticated? Carry on
        if (req.user) {
            return next();
        }

        return passport.authenticate('cookie', (err, user) => {
            if (user) {
                // We were able to authenticate with the Remember Me cookie, save the user on the request
                logger.info(`Logging user ${user.user_id} with e-mail ${user.email} via Remember Me cookie`);

                return req.login(user, { session: true }, next);
            }

            // Reset status on the response, failing a "remember me" cookie authentication is not a problem
            res.status(200);
            return next();
        })(req, res, next);
    };
};