const usersRepo = require('../../repositories/users');

module.exports = {
    serializeUser: (user, cb) => {
        cb(null, user.user_id);
        return null;
    },

    deserializeUser: (id, cb) => {
        usersRepo.getUserWithRoles(id).then((user) => {
            cb(null, user);
            return null;
        }).catch((err) => {
            cb(err);
            return null;
        });
    },
};