const usersRepo = require('../../repositories/users');

async function handle({}, { activationCode }) {
    const user = await usersRepo.activateUserByActivationCode(activationCode);

    if (!user) {
        return Promise.reject(new Error('User not found by activation code.'));
    }

    return Promise.resolve(user);
}

module.exports = { handle };