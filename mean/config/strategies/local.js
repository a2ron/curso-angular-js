var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        Usuario = require('mongoose').model('Usuario');

module.exports = function()
{
    /**
     * estrategia local
     */
    passport.use(new LocalStrategy(function(username, password, done)
    {
        Usuario.findOne({
            username: username
        }, function(err, user)
        {
            if (err) {
                return done(err);
            }
            if (!user)
            {
                return done(null, false, {
                    message: 'Usuario desconocido'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'No coincide'
                });
            }
            return done(null, user);
        });
    }));
};