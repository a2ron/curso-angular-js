'use strict';

var cbase = require('../../app/controllers/controllerBase.server.controller.js');
var params = {
    Model: require('mongoose').model('Apunte'),
    reqModel: 'apunte',
    acceptedData: ['titulo', 'descripcion', 'idCategoriaApunte', 'importe', 'computable', 'deuda', 'datetime']
};


cbase.controllerBase(exports, params);

exports.coherencia = function(obj)
{
    if (obj.computable)
        obj.deuda = false;
};
exports.list = function(req, res, next)
{
    params.Model.find().sort({createdOn: -1}).populate('idCategoriaApunte').exec(function(err, objs)
    {
        if (err)
            return next(err);
        else {
            res.json(objs);
        }
    });

};

exports.info = function(req, res, next)
{
    if (req.param('info') === 'summary') {
        /**
         * NOTE: En vez de usar aggregate, hago manualmente la sumatoria ya que hay problemas con el casting de tipos (flotantes guardados como string)
         */
        params.Model.find(function(err, objs)
        {
            if (err)
                return next(err);
            else {
                var total = 0;
                var deuda = 0;
                for (var i in objs)
                {
                    var obj = objs[i];
                    if (obj.deuda)
                        deuda += obj.importe;
                    else
                        total += obj.importe;
                }
                var result = {
                    total: total.toFixed(3),
                    deuda: deuda.toFixed(3)
                };
                console.log(result);
                res.json(result);
            }
        });
    }

};

/**
 * Filtra apuntes con posibles filtros: categoria, fecha inicial y fecha final
 *  - Determina los filtros segun los parametros en req: idCategoriaApunte,yearIni,monthIni,dayIni,yearFin,monthFin,dayFin
 *  - Si idCategoriaApunte vale 0, considera que no hay filtro por categoria
 *  - Si yearIni, monthIni y dayIni valen 0, considera que no hay filtro por fecha inicial
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
exports.listFilter = function(req, res, next)
{
    var ok = true;
    var filter = {};
    //filter by categoria
    if (req.param('idCategoriaApunte') && req.param('idCategoriaApunte') !== '0')
    {
        filter.idCategoriaApunte = req.param('idCategoriaApunte');
    }
    //filter by date
    var filterDate = {};
    //filter by date (start)
    if (req.param('yearIni') && !(req.param('yearIni') === '0' && req.param('monthIni') === '0' && req.param('dayIni') === '0')) {
        var start = new Date(Date.UTC(
                req.param('yearIni') ? req.param('yearIni') : 0,
                (req.param('monthIni') ? req.param('monthIni') - 1 : 0),
                req.param('dayIni') ? req.param('dayIni') : 0));
        if (start && start.getYear() > 0)
            filterDate.$gte = start;
        else
            ok = false;
    }
    //filter by date (end)
    if (req.param('yearFin')) {
        var end = new Date(Date.UTC(
                req.param('yearFin') ? req.param('yearFin') : 0,
                (req.param('monthFin') ? req.param('monthFin') - 1 : 0),
                req.param('dayFin') ? req.param('dayFin') : 0));
        end.setDate(end.getDate() + 1);
        if (end && end.getYear() > 0)
            filterDate.$lt = end;
        else
            ok = false;
    }
    if (Object.keys(filterDate).length > 0) {
        filter = {
            $or: [
                {$and: [{datetime: null}, {createdOn: filterDate}]},
                {datetime: filterDate}
            ]
        };

        console.log('Filter: ');
        console.log(filter);
    }
    //find
    if (ok) {
        params.Model.find(filter).sort({createdOn: -1}).exec(function(err, objs)
        {
            if (err)
                return next(err);
            else {
                res.json(objs);
            }
        });
    }
    else
        next();

};
