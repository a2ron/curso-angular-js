'use strict';

//Cargar el controller
var apuntes = require('../../app/controllers/apuntes.server.controller');

module.exports = function(app)
{
    app.route('/apuntes')
            .post(apuntes.create)
            .get(apuntes.list);
    app.route('/apuntes/:apunteId')
            .get(apuntes.read)
            .put(apuntes.update)
            .delete(apuntes.delete);
    //así, la funcion 'apunteById' se ejecutara cuando se necesite el parametro
    app.param('apunteId', apuntes.apunteById);
};