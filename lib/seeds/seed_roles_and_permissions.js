const roles = require('../constants/roles');
const permissions = require('../constants/permissions');
const mapping = require('../constants/role-to-permissions-mapping');

exports.seed = async function seedRolesAndPermissions(knex) {
    // Add new roles
    await Promise.mapSeries(
        Object.keys(roles),
        (roleCode) => knex.raw(
            'INSERT INTO role (role_code, description) VALUES(?, ?) ON CONFLICT (role_code) DO UPDATE SET description = ?',
            [roleCode, roles[roleCode], roles[roleCode]],
        ),
    );

    // Add new permissions
    await Promise.mapSeries(
        Object.keys(permissions),
        (permCode) => knex.raw(
            'INSERT INTO permission (permission_code, description) VALUES(?, ?) ON CONFLICT (permission_code) DO UPDATE SET description = ?',
            [permCode, permissions[permCode], permissions[permCode]],
        ),
    );

    // Remove stale permissions
    await knex('permission').whereNotIn('permission_code', Object.keys(permissions)).del();

    // Remove stale roles
    await knex('role').whereNotIn('role_code', Object.keys(roles)).del();

    // Re-seed permissions
    await knex('role_permission').del();
    await Promise.mapSeries(
        Object.keys(mapping),
        (mappingKey) => knex.batchInsert('role_permission', mapping[mappingKey].map((mappingEntry) => ({
            role_code: mappingKey,
            permission_code: mappingEntry,
        }))),
    );
};