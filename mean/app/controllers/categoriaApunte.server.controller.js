'use strict';

var cbase = require('../../app/controllers/controllerBase.server.controller.js');

var params = {
    Model: require('mongoose').model('CategoriaApunte'),
    reqModel: 'categoriaApunte',
    acceptedData: ['titulo', 'descripcion']
};

cbase.controllerBase(exports, params);

exports.delete = function(req, res, next)
{
    var apunte = require('mongoose').model('Apunte');
    var obj = req[params.reqModel];

    apunte.find({idCategoriaApunte: obj._id}, function(err, objs)
    {
        if (err)
        {
            return next(err);
        }
        else {
            //check there aren't apuntes
            if (objs.length === 0) {
                obj.remove(function(err)
                {
                    if (err)
                        return next(err);
                    else {
                        res.json(obj);
                    }
                });
            }
            else
                return next(err);//error: there are apuntes in the categoria
        }
    });


};
