const {
    lstatSync, readdirSync, pathExistsSync,
} = require('fs-extra');
const { join } = require('path');

const isDirectory = (source) => lstatSync(source).isDirectory();
const getDirectories = (source) =>
    readdirSync(source).map((name) => join(source, name)).filter(isDirectory);

module.exports = function handleMissingStaticAssetsBuilder(path, mountPoint = '/') {
    if (!pathExistsSync(path)) {
        throw new Error(`Cannot handle a non-existent static assets path: ${path}`);
    }

    const staticAssetDirs = getDirectories(path);

    return function handleMissingStaticAssets(req, res, next) {
        if (staticAssetDirs.some((folderName) => (req.url || '').indexOf(mountPoint + folderName) === 0)) {
            return res.sendStatus(404);
        }

        return next();
    };
};