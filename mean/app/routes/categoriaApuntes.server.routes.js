'use strict';

//Cargar controladores necesarios
var controller = require('../../app/controllers/categoriaApunte.server.controller');
var cu = require('../../app/controllers/usuarios.server.controller');
var crudBase = require('../../app/routes/crudBase.server.routes.js');

var param = 'categoriaApunteId';
var path = '/api/categorias';

module.exports = function(app)
{
    crudBase(cu, controller, app, path, param);
    
    app.route(path + '/ap/:op')
            .get(cu.requiresLogin, controller.listWithApuntes);
    app.param('op', controller.getParamOp);
};