'use strict';

//Cargar controladores necesarios
var controller = require('../../app/controllers/apuntes.server.controller');
var cu = require('../../app/controllers/usuarios.server.controller');

var paramId = 'apunteId';
var path = '/api/apuntes';

module.exports = function(app)
{
    app.route(path)
            .post(cu.requiresLogin, controller.create)
            .get(controller.list);

    //rutas parametrizadas
    app.route(path + '/:' + paramId)
            .get(controller.read)
            .put(cu.requiresLogin, controller.update)
            .delete(cu.requiresLogin, controller.delete);

    //así, la funcion 'getById' se ejecutara cuando se necesite el parametro
    // (poner aqui la seguridad requiresLogin??  )
    app.param(paramId, controller.getById);
};