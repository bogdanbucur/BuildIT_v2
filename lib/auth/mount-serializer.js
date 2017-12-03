module.exports = function mountSerializer(passport, {
    serializeUser,
    deserializeUser,
}) {
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
};