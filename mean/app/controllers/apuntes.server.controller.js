'use strict';

//Cargar el modelo
var Model = require('mongoose').model('Apunte');
var reqModel = 'apunte';

//metodo CREATE
exports.create = function(req, res, next)
{
    //crear la nueva instancia
    var apunte = new Model(req.body);
    //guardarla en BD
    apunte.save(function(err)
    {
        if (err) //llamar al siguiente middleware con un mensaje de error
            return next(err);

        else //enviar respuesta en JSON
            res.json(apunte);
    });
};

//metodo list
exports.list = function(req, res, next)
{
    Model.find().sort('-created').populate('idCategoriaApunte').exec(function(err, objs)
    {
        if (err)
            return next(err);
        else
            res.json(objs);
    });
};

exports.read = function(req, res)
{
    res.json(req.apunte);
};

//metodo para obtener
exports.getById = function(req, res, next, id)
{
    Model.findOne({_id: id}, function(err, apunte)
    {
        if (err)
            return next(err);
        else {
            req.apunte = apunte;
            next();
        }
    });
};

//metodo para actualizar
exports.update = function(req, res, next)
{
    Model.findByIdAndUpdate(req.apunte.id, req.body, function(err, apunte)
    {
        if (err)
            return next(err);
        else {
            res.json(apunte);
        }
    });
};

//metodo para borrar un apunte
exports.delete = function(req, res, next)
{
    var obj = req[reqModel];
    obj.remove(function(err)
    {
        if (err)
            return next(err);
        else {
            res.json(obj);
        }
    });
};

//middleware para permisos
/*exports.hasAuthorization = function(req, res, next)
{
    var obj = req[reqModel];
    if (!req.user)
    {
        return res.status(403).send({
            message: 'Debe iniciar sesión'
        });
    }

    next();
};*/