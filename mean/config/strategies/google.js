var passport = require('passport'),
        url = require('url'),
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        config = require('../config'),
        usuarios = require('../../app/controllers/usuarios.server.controller');

module.exports = function()
{
    /**
     * estrategia local
     */
    passport.use(new GoogleStrategy({
        /* info de la aplicacion google */
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done)
    {
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        //volcar la info de google en un usuario nuestro
        var providerUserProfile = {
            nombre: profile.name.givenName,
            apellidos: profile.name.familyName,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            providerId: profile.id,
            providerData: providerData
        };

        usuarios.saveOAuthUserProfile(req, providerUserProfile, done);

    }));
};