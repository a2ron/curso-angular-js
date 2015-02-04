'use strict';

module.exports = function(cu, controller, app, path, param, extendsFunction)
{

    app.route(path)
            .post(cu.requiresLogin, controller.create)
            .get(cu.requiresLogin, controller.list);

    app.route(path + '/:' + param)
            .get(cu.requiresLogin, controller.read)
            .put(cu.requiresLogin, controller.update)
            .delete(cu.requiresLogin, controller.delete);


    //así, la funcion 'getById' se ejecutara cuando se necesite el parametro
    // (poner aqui la seguridad requiresLogin??  )
    app.param(param, controller.getById);
};