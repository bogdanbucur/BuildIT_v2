const roles = require('./roles');
const permissions = require('./permissions');

const roleCodes = Object.keys(roles).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});
const permissionCodes = Object.keys(permissions).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});

const mapping = {
    [roleCodes.ADMIN]: [
        permissionCodes.CREATE_PRODUCT,
        permissionCodes.REMOVE_PRODUCT,
        permissionCodes.BAN_USER,
        permissionCodes.ALTER_ROLE,
        permissionCodes.MANAGE_USERS,
    ],
    [roleCodes.MODERATOR]: [
        permissionCodes.CREATE_PRODUCT,
        permissionCodes.REMOVE_PRODUCT,
        permissionCodes.MANAGE_USERS,
    ],
};

module.exports = mapping;