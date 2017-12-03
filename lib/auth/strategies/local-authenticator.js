const passport = require('passport');
const { Strategy } = require('passport-local');
const service = require('../../service/index');

passport.use(new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    ((req, email, password, cb) => service.checkUser(email, password)
        .then((checkResult) => {
            if (!checkResult.state) {
                req.session.flash.messages.push({
                    type: checkResult.type,
                    message: checkResult.message,
                });
                req.session.flash.prevReq = req.body;
                cb(null, false);
                return null;
            }
            req.session.flash.messages.push({
                type: checkResult.type,
                message: checkResult.message,
            });
            cb(null, checkResult.user);
            return null;
        })
        .catch((err) => {
            cb(err);
            return null;
        })),
));

module.exports = passport;