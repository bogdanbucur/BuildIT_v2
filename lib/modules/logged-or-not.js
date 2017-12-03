module.exports = {
    isLoggedIn,
    isNotLoggedIn,
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
    if (req.isUnauthenticated()) {
        return next();
    }
    return res.redirect('/home');
}