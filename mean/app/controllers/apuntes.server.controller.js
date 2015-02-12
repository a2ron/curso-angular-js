'use strict';

var cbase = require('../../app/controllers/controllerBase.server.controller.js');
var params = {
    Model: require('mongoose').model('Apunte'),
    reqModel: 'apunte',
    acceptedData: ['titulo', 'descripcion', 'idCategoriaApunte', 'importe']
};


cbase.controllerBase(exports, params);


exports.list = function(req, res, next)
{
    params.Model.find().populate('idCategoriaApunte').exec(function(err, objs)
    {
        if (err)
            return next(err);
        else{
            res.json(objs);
        }
    });

};

exports.listFilter = function(req, res, next)
{
    params.Model.find({idCategoriaApunte: req.idCategoriaApunte}, function(err, objs)
    {
        if (err)
            return next(err);
        else {
            res.json(objs);
        }
    });
};

exports.getByIdCategoriaApunte = function(req, res, next, idCategoriaApunte)
{
    req['idCategoriaApunte'] = idCategoriaApunte;
    next();
};
