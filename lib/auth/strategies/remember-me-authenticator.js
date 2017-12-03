const passport = require('passport');
const CookieStrategy = require('passport-cookie').Strategy;

const env = require('../../config/env');
const usersRepo = require('../../repositories/users');

passport.use(new CookieStrategy(
    {
        cookieName: env.REMEMBER_ME_COOKIE_NAME,
    },

    ((rememberMe, done) => {
        if (!rememberMe) {
            done(null, false);
            return null;
        }
        return usersRepo.getUserIdByToken(rememberMe)
            .then((user) => {
                if (!user) {
                    done(null, false);
                    return null;
                }
                return usersRepo.getUserWithRoles(user.user_id)
                    .then((userDetails) => {
                        done(null, userDetails);
                        return null;
                    });
            })
            .catch((err) => {
                done(err);
                return null;
            });
    }),
));

module.exports = passport;