/* CONFIGURACIÓN DEL MODULO PASSPORT */
var passport = require('passport'),
        mongoose = require('mongoose');

module.exports = function()
{
    var Usuario = mongoose.model('Usuario');

    passport.serializeUser(function(user, done)
    {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done)
    {
        Usuario.findOne({
            _id: id
        }, '-password -salt', function(err, user)
        {
            done(err, user);
        });
    });

    require('./strategies/local.js')();
    require('./strategies/google.js')();
};