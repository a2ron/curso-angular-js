'use strict';

module.exports = function(cu, controller, app, path, paramsIds)
{

    app.route(path)
            .post(cu.requiresLogin, controller.create)
            .get(cu.requiresLogin, controller.list);

    app.route(path + '/:' + paramsIds[0])
            .get(cu.requiresLogin, controller.read)
            .put(cu.requiresLogin, controller.update)
            .delete(cu.requiresLogin, controller.delete);

    //así, la funcion 'getById' se ejecutara cuando se necesite el parametro
    // (poner aqui la seguridad requiresLogin??  )
    app.param(paramsIds[0], controller.getById);

    if (paramsIds[1])
    {
        var params = "";
        for (var i in paramsIds)
            params += '/:' + paramsIds[i];
        //rutas parametrizadas
        app.route(path + params)
                .get(cu.requiresLogin, controller.list2);
        app.param(paramsIds[1], controller.getByIdCategoriaApunte);
    }
};