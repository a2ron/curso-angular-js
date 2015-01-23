'use strict';

//Cargar el modelo
var Usuario = require('mongoose').model('Usuario');
var passport = require('passport');

/**
 * Manejador de errores
 * @param {type} err
 * @returns {undefined}
 */
var getErrorMessage = function(err)
{
    var message = '';
    //error de mongoose
    if (err.code)
    {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Usuario ya existe';
                break;
            default:
                message = 'Se ha producido un error';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    return message;
};

/* Renderizado vista SignIn */
exports.renderSignin = function(req, res, next)
{
    //si el usuario no esta conectado...
    if (!req.user)
    {
        res.render('signin', {
            title: 'Nuevo Usuario',
            messages: req.flash('error') || req.flash('info')
        });
    } else //si el usuario esta conectado, redireccionar a la pagina de inicio
        return res.redirect('/');
};

/* Renderizado vista SignUp */
exports.renderSignup = function(req, res, next)
{
    //si el usuario no esta conectado...
    if (!req.user)
    {
        res.render('signup', {
            title: 'Entrar',
            messages: req.flash('error')
        });
    } else //si el usuario esta conectado, redireccionar a la pagina de inicio
        return res.redirect('/');
};

//metodo CREATE
exports.create = function(req, res, next)
{
    //crear la nueva instancia
    var obj = new Usuario(req.body);
    //guardarla en BD
    obj.save(function(err)
    {
        if (err) //llamar al siguiente middleware con un mensaje de error
            return next(err);

        else //enviar respuesta en JSON
            res.json(obj);
    });
};

//metodo list
exports.list = function(req, res, next)
{
    Usuario.find({}, function(err, objs)
    {
        if (err)
            return next(err);
        else
            res.json(objs);
    });
};

exports.read = function(req, res)
{
    res.json(req.user);
};

exports.userById = function(req, res, next, id)
{
    Usuario.findOne({_id: id}, function(err, obj)
    {
        if (err)
            return next(err);
        else {
            req.user = obj;
            next();
        }
    });
};

exports.update = function(req, res, next)
{
    Usuario.findByIdAndUpdate(req.user.id, req.body, function(err, obj)
    {
        if (err)
            return next(err);
        else {
            res.json(obj);
        }
    });
};

exports.delete = function(req, res, next)
{
    req.user.remove(function(err)
    {
        if (err)
            return next(err);
        else {
            res.json(apunte);
        }
    });
};

/*
 * SignIn ya lo incluye passport
 */

exports.signup = function(req, res, next)
{
    if (!req.user)
    {
        var usuario = new Usuario(req.body);
        var message = null;
        usuario.provider = 'local';

        usuario.save(function(err)
        {
            if (err)
            {
                return res.redirect('/signup');
            }
            //método passport
            req.login(usuario, function(err)
            {
                //cuando haya exito, tendremos un usuario en req.user
                if (err)
                    return next(err);
                return res.redirect('/');
            });
        });
    }
};

exports.signout = function(req, res)
{
    req.logout();//provisto por el módulo passport
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");//no cache
    res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done)
{
    Usuario.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user)
    {
        if (err)
            return done(err);
        else if (!user)
        {
            var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
            Usuario.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                profile.username = availableUsername;

                var usuario = new Usuario(profile);
                usuario.save(function(err)
                {
                    return done(err, usuario);
                });
            });
        }
        else {
            return done(err, user);
        }

    });
};
