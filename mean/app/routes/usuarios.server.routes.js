'use strict';

//Cargar el controller
var usuarios = require('../../app/controllers/usuarios.server.controller');
var passport = require('passport');

module.exports = function(app)
{
    app.get('/oauth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        faiulureRedirect: '/signin'
    }));

    app.get('/oauth/google/callback', passport.authenticate('google', {
        faiulureRedirect: '/signin',
        successRedirect: '/'
    }));

    app.route('/signup')
            .get(usuarios.renderSignup)
            .post(usuarios.signup);

    app.route('/signin')
            .get(usuarios.renderSignin)
            .post(passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/signin',
                failureFlash: true //usar mensajes flash
            }));

    app.route('/signout')
            .get(usuarios.signout);

    app.route('/usuarios')
            .post(usuarios.create)
            .get(usuarios.list);

    app.route('/usuarios/:usuarioId')
            .get(usuarios.read)
            .put(usuarios.update)
            .delete(usuarios.delete);

    app.param('usuarioId', usuarios.userById);
};