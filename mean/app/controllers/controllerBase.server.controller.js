'use strict';

exports.controllerBase = function(exports, params)
{


    /**
     * For check fields before update, create...
     * @param {type} arrayParams
     * @param {type} jsonOriginal
     * @returns {unresolved}
     */
    function checkFieldsAndGetJson(arrayParams, jsonOriginal) {
        var json = {};
        if (!arrayParams)
            arrayParams = Object.keys(params.Model.schema.paths);
        for (var i in arrayParams)
        {
            var field = arrayParams[i];
            if (jsonOriginal[field] !== undefined)
                json[field] = jsonOriginal[field];
        }

        return json;
    }


    exports.create = function(req, res, next)
    {
        //crear la nueva instancia
        var obj = new params.Model(req.body);

        obj.creator = req.user;

        //guardarla en BD
        obj.save(function(err)
        {
            if (err) //llamar al siguiente middleware con un mensaje de error
                return next(err);

            else //enviar respuesta en JSON
                res.json(obj);
        });
    };

    exports.list = function(req, res, next)
    {
        params.Model.find().sort('-created').populate('creator').exec(function(err, objs)
        {
            if (err)
                return next(err);
            else
                res.json(objs);
        });

    };



    exports.read = function(req, res)
    {
        res.json(req[params.reqModel]);
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
        params.Model.findOne({_id: id}, function(err, obj)
        {
            if (err)
                return next(err);
            else {
                req[params.reqModel] = obj;
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
        //check fields
        var update = checkFieldsAndGetJson(params.acceptedData, req.body);
        //save
        params.Model.findByIdAndUpdate(req[params.reqModel].id, update, function(err, obj)
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
        var obj = req[params.reqModel];
        obj.remove(function(err)
        {
            if (err)
                return next(err);
            else {
                res.json(obj);
            }
        });
    };

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


/**
 * Manejador de errores
 * @param {type} err
 * @returns {undefined}
 */
/*var getErrorMessage = function(err)
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
 };*/