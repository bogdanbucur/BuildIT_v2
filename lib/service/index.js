const bcrypt = require('bcrypt-nodejs');
const _ = require('underscore');

const usersRepo = require('../repositories/users');

const service = {
    checkUser: (email, password) => usersRepo.getUserByEmail(email)
        .then((user) => {
            if (!user) {
                return { state: false, type: 'error', message: 'Non-existent email.' };
            }

            if (!user.activated_at) {
                return { state: false, type: 'error', message: 'The account has not yet been activated.' };
            }

            return service.verifyPassword(password, user.password)
                .then((passwordCorrect) => {
                    if (!passwordCorrect) {
                        return {
                            state: false, type: 'error', message: 'Incorrect password.',
                        };
                    }

                    return usersRepo.getUserWithRoles(user.user_id).then((userWithRoles) => ({
                        state: true, type: 'success', message: 'Successfully logged in!', user: userWithRoles,
                    }));
                });
        }),

    verifyPassword: (password, hash) => new Promise((resolve, reject) => bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            return reject(new Error(err));
        }
        return resolve(result);
    }))
        .then((result) => result),
};

module.exports = service;