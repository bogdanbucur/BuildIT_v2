const roles = require('./roles');
const permissions = require('./permissions');

const roleCodes = Object.keys(roles).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});
const permissionCodes = Object.keys(permissions).reduce((acc, code) => Object.assign(acc, { [code]: code }), {});

module.exports = {
    roleCodes,
    permissionCodes,
};