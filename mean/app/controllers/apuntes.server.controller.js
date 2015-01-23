'use strict';

//Cargar el modelo
var Apunte = require('mongoose').model('Apunte');

//metodo CREATE
exports.create = function(req, res, next)
{
    //crear la nueva instancia
    var apunte = new Apunte(req.body);
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
    Apunte.find({}, 'descripcion', function(err, apuntes)
    {
        if (err)
            return next(err);
        else
            res.json(apuntes);
    });
};

exports.read = function(req, res)
{
    res.json(req.apunte);
};

//metodo para obtener un apunte
exports.apunteById = function(req, res, next, id)
{
    Apunte.findOne({_id: id}, function(err, apunte)
    {
        if (err)
            return next(err);
        else {
            req.apunte = apunte;
            next();
        }
    });
};

//metodo para actualizar un apunte
exports.update = function(req, res, next)
{
    Apunte.findByIdAndUpdate(req.apunte.id, req.body, function(err, apunte)
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
    req.apunte.remove(function(err)
    {
        if (err)
            return next(err);
        else {
            res.json(apunte);
        }
    });
};


