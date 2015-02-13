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


    app.route(path + '/filter/:idCategoriaApunte/:yearIni?/:monthIni?/:dayIni?/:yearFin?/:monthFin?/:dayFin?')
            .get(cu.requiresLogin, controller.listFilter);
};