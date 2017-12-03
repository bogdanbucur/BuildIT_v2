require('../../../node-environment');

const _ = require('underscore');

const logger = require('../../helpers/logger');
const usersRepo = require('../../repositories/users');

async function handle({}, { user, body }) {
    if (!user) {
        throw new Error('Missing payload');
    }

    const userProfile = await usersRepo.getUserProfile(user.user_id);
    let userResult;
    const userData = Object.assign(body, {
        user_id: user.user_id
    });

    if (userProfile.length <= 0) {
        userResult = await usersRepo.addUserProfile(userData)
            .catch((err) => {
                logger.error('Could not save user data into database', err);
                return Promise.reject(err);
            });
    } else {
        userResult = await usersRepo.updateUserProfile(userData)
            .catch((err) => {
                logger.error('Could not save user data into database', err);
                return Promise.reject(err);
            });
    }

    if (!userResult || !userResult.user_id) {
        return Promise.resolve({
            state: false,
            type: 'danger',
            message: 'An unexpected error occurred saving the user',
        });
    }

    return Promise.resolve({
        state: true, type: 'success', message: 'User profile saved!', new_user: userResult,
    });
}

module.exports = {
    handle,
};