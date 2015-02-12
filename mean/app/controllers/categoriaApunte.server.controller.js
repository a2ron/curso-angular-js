'use strict';

var cbase = require('../../app/controllers/controllerBase.server.controller.js');

var params = {
    Model: require('mongoose').model('CategoriaApunte'),
    reqModel: 'categoriaApunte',
    acceptedData: ['titulo', 'descripcion']
};

cbase.controllerBase(exports, params);

exports.listWithApuntes = function(req, res, next)
{
    var Apunte = require('mongoose').model('Apunte');

    Apunte.aggregate([
        {$group: {
                _id: '$idCategoriaApunte',
                sum: {$sum: '$importe'}
            }}
    ], function(err, sums) {
        if (err) {
            return next(err);
        } else {
            params.Model.find().exec(function(err, objs)
            {
                if (err)
                    return next(err);
                else {
                    for (var i in objs) {
                        var sum = (sums.filter(function(x) {
                            return '' + x._id === '' + objs[i]._id;
                        }))[0];
                        if (sum) {
                            objs[i] = objs[i].toJSON();
                            objs[i].sum = sum.sum;
                        }
                    }
                    res.json(objs);
                }

            });
        }
    });

};

exports.getParamOp = function(req, res, next, param)
{
    req['op'] = param;
    next();
};
