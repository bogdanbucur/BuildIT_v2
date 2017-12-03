require('../../../node-environment');

const usersRepo = require('../../repositories/users');

async function handle({}, { userId, rememberMeCookie = null }) {
    if (!userId) {
        throw new Error('Missing payload');
    }

    let removedCookieCount;
    if (rememberMeCookie) {
        removedCookieCount = !!await usersRepo.deleteRememberMeCookieByUserId(userId, rememberMeCookie);
    }

    return Promise.resolve({
        state: true, type: 'success', message: 'User logged out!', removed_remember_me_cookie: removedCookieCount,
    });
}

module.exports = {
    handle,
};