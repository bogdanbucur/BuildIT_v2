const crypto = require('crypto');

const usersRepo = require('../../repositories/users');

async function handle({ req }) {
    if (!req || !req.user || !req.user.user_id) {
        throw new Error('Missing user ID on context request');
    }

    const cookie = crypto.randomBytes(64).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        .replace(/=/g, '');

    await usersRepo.setCookie(req.user.user_id, cookie);

    return cookie;
}

module.exports = {
    handle,
};