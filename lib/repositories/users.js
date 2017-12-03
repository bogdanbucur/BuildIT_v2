const _ = require('underscore');

module.exports = {
    getUserById,
    getUserWithRoles,
    getPagedUsersWithRoles,
    getUserByEmail,
    getUserByPasswordResetCode,
    getUserIdByToken,
    changeUserPassword,
    setUserPasswordResetCode,
    activateUserByActivationCode,
    assignRoleToUser,
    createUser,
    setCookie,
    deleteRememberMeCookieByUserId,
    deleteAllRememberMeCookiesByUserId,
    findUserActivationCode,
    addUserProfile,
    updateUserProfile,
    getUserProfile,
};

const {performQueries, applyPagination, extractQueryFilters} = require('./_toolbelt');

const moment = require('moment');
const knex = require('../db');

function getUserById(id) {
    return knex('user').where({user_id: id}).first().then((user) => _.omit(user, 'password'));
}

function getUserProfile(id) {
    return knex('user_profile').where({user_id: id}).then((userProfile) => userProfile);
}

async function getUserWithRoles(id) {
    const userProfile = await getUserProfile(id);
    const user = await getUserById(id);

    if (!user) {
        return Promise.resolve(user);
    }

    return knex('role')
        .join('user_role', 'role.role_code', 'user_role.role_code')
        .join('role_permission', 'user_role.role_code', 'role_permission.role_code')
        .join('permission', 'role_permission.permission_code', 'permission.permission_code')
        .where('user_role.user_id', user.user_id)
        .select(
            'role.role_code',
            'permission.permission_code',
        )
        .then((results) => {
            const seenRole = {};
            const seenPermissions = {};

            return Object.assign(user, userProfile, results.reduce((acc, record) => {
                if (!seenRole[record.role_code]) {
                    acc.role.push(record.role_code);
                    seenRole[record.role_code] = true;
                }

                if (!seenPermissions[record.permission_code]) {
                    acc.permissions.push(record.permission_code);
                    seenPermissions[record.permission_code] = true;
                }

                return acc;
            }, {
                role: [],
                permissions: [],
            }));
        });
}

function getPagedUsersWithRoles(dataTable) {
    return performQueries(
        applyPagination(
            dataTable,
            extractQueryFilters(
                dataTable,
                knex('user')
                    .join('user_role', 'user_role.user_id', 'user.user_id')
                    .join('role', 'user_role.role_code', 'role.role_code')
                    .join('user_profile', 'user_profile.user_id', 'user.user_id'),
                ['user.first_name', 'user.last_name', 'user.email', 'user.activated', 'user_role.role_code'],
            ),
        ),
        [
            'user.user_id',
            'user.first_name',
            'user.last_name',
            'user.email',
            'user.activated',
            'role.role_code',
            'role.description AS role_description',
            'user_profile.occupation',
            'user_profile.company_name',
            'user_profile.city',
            'user_profile.country',
        ],
    );
}

function getUserByEmail(email) {
    return knex('user').where({email}).first();
}

function getUserByPasswordResetCode(passwordResetCode) {
    return knex('user').where({password_reset_code: passwordResetCode}).first();
}

function getUserIdByToken(rememberMe) {
    return knex('remember_me_cookie')
        .where('cookie', rememberMe)
        .andWhere('expiration_date', '>', moment().format('YYYY-MM-DD'))
        .first('user_id');
}

function changeUserPassword(passwordResetCode, password) {
    return knex('user')
        .where({password_reset_code: passwordResetCode})
        .update({
            password,
            password_reset_code: null,
            password_reset_code_expires_at: null,
        })
        .returning('*')
        .then(([user]) => (user ? _.omit(user, 'password') : null));
}

function setUserPasswordResetCode(email, resetPasswordCode) {
    return knex('user')
        .where({email})
        .update({
            password_reset_code: resetPasswordCode,
            password_reset_code_expires_at: knex.raw("now() + interval '1 hour'"),
        })
        .returning('*')
        .then(([user]) => (user ? _.omit(user, 'password') : null));
}

function activateUserByActivationCode(activation_code) {
    return knex('user')
        .where({activation_code})
        .update({
            activation_code: null,
            activated_at: knex.raw('now()'),
            activated: 1,
        })
        .returning('*')
        .then(([user]) => (user ? _.omit(user, 'password') : null));
}

function assignRoleToUser(user_id, role_code) {
    return knex.insert({user_id, role_code}).into('user_role');
}

function createUser(userData) {
    return knex.returning('*').insert(userData).into('user').then(([user]) => _.omit(user, 'password'));
}

function setCookie(user_id, cookie) {
    return knex('remember_me_cookie')
        .insert({
            user_id,
            cookie,
            expiration_date: moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
        });
}

function deleteRememberMeCookieByUserId(user_id, cookie) {
    return knex('remember_me_cookie')
        .where({user_id, cookie})
        .del();
}

function deleteAllRememberMeCookiesByUserId(user_id) {
    return knex('remember_me_cookie')
        .where({user_id})
        .del();
}

function findUserActivationCode(activation_code) {
    return knex('user').select('activation_code').where({activation_code}).first();
}

function addUserProfile(userData) {
    return knex.returning('*').insert(userData).into('user_profile').then(([user]) => user);
}

function updateUserProfile(body) {
    return knex('user_profile').where({ user_id: body.user_id }).update(body).returning('*').then(([user]) => user);
}
