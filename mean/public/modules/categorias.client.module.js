function categoriasController($scope, $routeParams, $location, categoriasApuntesFactory, $filter, apuntesFactory, categoriasApuntesMETA)
{
    controllerBase($scope, $routeParams, $location, categoriasApuntesFactory, categoriasApuntesMETA);

    $scope.idCategoriaSelected = 0;
    $scope.findApuntes = function()
    {
        var filter = {};
        filter.idCategoriaApunte = $scope.idCategoriaSelected;
        $scope.apuntes = apuntesFactory.filter(filter);

    };

    $scope.find = function()
    {
        $scope.objs = categoriasApuntesFactory.queryWithApuntes({
            op: 'sum'
        });
    };

    /*definir el schema del form ahora que tengo las categorias*/
    $scope.schema = {
        type: "object",
        properties: {
            titulo: {type: "string", minLength: 2, title: "Título", required: true},
            descripcion: {
                type: "string",
                title: "Descripción"
            }
        }
    };
    $scope.form = [
        '*',
        $scope.actionButtons
    ];
}


/**********************************************************************************************************/

var params = {
    nameModule: 'categoriasApuntes',
    path: 'categorias',
    id: 'categoriaApunteId',
    pathAPI: 'api/categorias/:categoriaApunteId',
    viewParams: {
        name: 'Categorías',
        nameSingular: 'Categoría',
        listFields: [
            {
                title: 'Título',
                key: 'titulo'
            },
            {
                title: 'Descripción',
                key: 'descripcion'
            },
            {
                title: 'Total',
                key: 'sum'
            },
            {
                title: 'Num.',
                key: 'count'
            }
        ],
        path: 'categorias'//redundante pero necesario
    },
    injection: categoriasController,
    moreActionsREST: {
        queryWithApuntes: {
            url: 'api/categorias/ap/:op',
            method: 'GET',
            isArray: true
        }
    }
};

moduleCrudBase(params)/* routes */
        .config(['$routeProvider', params.nameModule + 'METAProvider',
            function($routeProvider, META) {
                $routeProvider.
                        when('/' + META.params.path, {
                            templateUrl: 'views/listCategorias.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/crear', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id, {
                            templateUrl: 'views/editCategoria.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id + '/edit', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        });
            }
        ]);