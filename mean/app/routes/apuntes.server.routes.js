'use strict';

//Cargar controladores necesarios
var controller = require('../../app/controllers/apuntes.server.controller');
var cu = require('../../app/controllers/usuarios.server.controller');
var crudBase = require('../../app/routes/crudBase.server.routes.js');

var param = 'apunteId';
var path = '/api/apuntes';

module.exports = function(app)
{
    crudBase(cu, controller, app, path, param);


    app.route(path + '/cat/:idCategoriaApunte')
            .get(cu.requiresLogin, controller.listFilter);
    app.param('idCategoriaApunte', controller.getByIdCategoriaApunte);
};