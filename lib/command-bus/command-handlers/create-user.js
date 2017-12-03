require('../../../node-environment');

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const _ = require('underscore');

const logger = require('../../helpers/logger');
const usersRepo = require('../../repositories/users');

const commander = require('..');

// const { roleCodes } = require('../../constants');

const RANDOM_ACTIVATION_CODE_LENGTH = 50;

function createRandomActivationCode(randomActivationCodeLength) {
    return crypto.randomBytes(randomActivationCodeLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        .replace(/=/g, '');
}

function hashPassword(password) {
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

    return { passwordHash };
}

async function handle({}, { user }) {
    if (!user) {
        throw new Error('Missing payload');
    }

    // Snapshot the request body and prepare a password
    const { passwordHash } = hashPassword(user.password);
    const userData = Object.assign(_.omit(user, 'confirm_password'), {
        password: passwordHash,
        activation_code: createRandomActivationCode(RANDOM_ACTIVATION_CODE_LENGTH),
        activated: 0,
    });

    const userResult = await usersRepo.createUser(userData)
        .catch((err) => {
            logger.error('Could not save user into database', err);
            return Promise.reject(err);
        });

    if (!userResult || !userResult.user_id) {
        return Promise.resolve({
            state: false,
            type: 'danger',
            message: 'An unexpected error occurred saving the user',
        });
    }

    await usersRepo.assignRoleToUser(userResult.user_id, 'USER');

    await commander.handle(commander.commands.SEND_USER_ACTIVATION_EMAIL, {}, { userId: userResult.user_id });

    return Promise.resolve({
        state: true, type: 'success', message: 'User saved!', new_user: userResult,
    });
}

module.exports = {
    handle,
};