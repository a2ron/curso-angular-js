'use strict';

var cbase = require('../../app/controllers/controllerBase.server.controller.js');

var params = {
    Model: require('mongoose').model('CategoriaApunte'),
    reqModel: 'categoriaApunte',
    acceptedData: ['titulo', 'descripcion']
};

cbase.controllerBase(exports, params);
