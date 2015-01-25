'use strict';

//Cargar el modelo
var Modelo = require('mongoose').model('CategoriaApunte');
var reqModel = 'categoriaApunte';

/**
 * Manejador de errores
 * @param {type} err
 * @returns {undefined}
 */
var getErrorMessage = function(err)
{
    var message = '';
    if (err.errors)
    {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
                break;
            }
        }
    }
    else
        message = 'Error de servidor desconocido';
    return message;
};

//metodo CREATE
exports.create = function(req, res, next)
{
    //crear la nueva instancia
    var obj = new Modelo(req.body);

    obj.creator = req.user;

    //guardarla en BD
    obj.save(function(err)
    {
        if (err)
            return res.status(400).send({message: getErrorMessage(err)});

        else //enviar respuesta en JSON
            res.json(obj);
    });
};

//metodo list
exports.list = function(req, res, next)
{
    Modelo.find().sort('-created').populate('creator').exec(function(err, objs)
    {
        if (err)
            return next(err);
        else
            res.json(objs);
    });

};

exports.read = function(req, res)
{
    res.json(req[reqModel]);
};

/**
 * Metodo para obtener
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @param {type} id
 * @returns {undefined}
 */
exports.getById = function(req, res, next, id)
{
    Modelo.findOne({_id: id}, function(err, obj)
    {
        if (err)
            return next(err);
        else {
            req[reqModel] = obj;
            next();
        }
    });
};

/**
 * Metodo para actualizar
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
exports.update = function(req, res, next)
{
    Modelo.findByIdAndUpdate(req[reqModel].id, req.body, function(err, obj)
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
    var obj = req[reqModel];
    obj.remove(function(err)
    {
        if (err)
            return res.status(400).send({message: getErrorMessage(err)});
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