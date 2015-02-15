function categoriasController($scope, $routeParams, $location, categoriasApuntesFactory, filterFilter, apuntesFactory, categoriasApuntesMETA)
{
    controllerBase($scope, $routeParams, $location, categoriasApuntesFactory, categoriasApuntesMETA);

    $scope.findApuntes = function()
    {
        var filter = {};
        filter.idCategoriaApunte = ($scope.obj) ? $scope.obj._id : 0;
        $scope.apuntes = apuntesFactory.filter(filter);
    };

    $scope.find = function()
    {
        $scope.objs = categoriasApuntesFactory.queryWithApuntes({
            op: 'sum'
        }, function()
        {
            $scope.findApuntes();
        });
    };


    $scope.initViewEditOrCreate = function()
    {
        if ($scope.viewEditOrCreate === 'Editar') {
            $scope.findOne(function()
            {
                $scope.findApuntes();
            });
            $scope.action = $scope.update;
        }
        else {
            $scope.obj = new Factory({});
            $scope.action = $scope.create;
        }
    };

    $scope.changeSel = function(valueSel)
    {
        if (valueSel)
            $scope.itemSel = valueSel;
        console.log($scope.itemSel);
        $scope.apuntesFilter = [];
        var showns = filterFilter($scope.apuntes, {idCategoriaApunte: $scope.itemSel});
        angular.forEach(showns, function(value, key) {
            $scope.apuntesFilter.push(showns[key]);
        });
    };

    ////////////////////////////////////////////////////////////////////////////////////

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