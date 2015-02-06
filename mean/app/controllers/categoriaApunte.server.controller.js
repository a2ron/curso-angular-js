'use strict';

var cbase = require('../../app/controllers/controllerBase.server.controller.js');

cbase.controllerBase(exports,
        {
            Model: require('mongoose').model('CategoriaApunte'),
            reqModel: 'categoriaApunte',
            possibleParamsUpdate: ['titulo', 'descripcion']
        });