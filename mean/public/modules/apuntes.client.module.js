function apuntesController($scope, $routeParams, $location, categoriasApuntesFactory, apuntesFactory, apuntesMETA, filterFilter)
{
    controllerBase($scope, $routeParams, $location, apuntesFactory, apuntesMETA);

    function defSchema(categories)
    {
        //definir el schema del form ahora que tengo las categorias
        $scope.schema = {
            type: "object",
            properties: {
                titulo: {type: "string", minLength: 2, title: "Título", required: true},
                descripcion: {
                    type: "string",
                    title: "Descripción"
                },
                idCategoriaApunte: {
                    title: "Categoría",
                    type: 'string'
                }
            }
        };
        $scope.form = [
            'titulo',
            'descripcion',
            {
                key: "idCategoriaApunte",
                type: 'select',
                titleMap: categories
            },
            $scope.actionButtons 
        ];

        $scope.$apply();//for update interface
    }

    function loadCategorias()
    {
        var resCatQuery = categoriasApuntesFactory.query();

        function loadEnd()
        {
            if (resCatQuery.length <= 0) {
                setTimeout(loadEnd, 200);
            }
            else {
                var categories = [];
                $scope.categoriaApunte = resCatQuery[0];
                categories.push({
                    name: 'Seleccione una',
                    value: 0
                });
                for (var i in resCatQuery)
                {
                    var cat = resCatQuery[i];
                    if (cat.titulo) {
                        categories.push({
                            name: cat.titulo,
                            value: cat._id
                        });
                    }
                }
                defSchema(categories);
            }
        }
        loadEnd();
    }

    $scope.initViewEditOrCreate = function()
    {
        if ($scope.viewEditOrCreate === 'Editar') {
            $scope.findOne();
            $scope.action = $scope.update;
        }
        else {
            $scope.action = $scope.create;
            $scope.obj = new apuntesFactory({
                idCategoriaApunte: 0
            });
        }
        loadCategorias();
    };
}

var params = {
    nameModule: 'apuntes',
    path: 'apuntes',
    id: 'apunteId',
    pathAPI: 'api/apuntes/:apunteId',
    viewParams: {
        name: 'Apuntes',
        nameSingular: 'Apunte',
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
                title: 'Categoría',
                key: 'idCategoriaApunte'
            }
        ],
        path: 'apuntes'//redundante pero necesario
    },
    injection: apuntesController
};

moduleCrudBase(params)
        /* routes */
        .config(['$routeProvider', params.nameModule + 'METAProvider',
            function($routeProvider, META) {
                $routeProvider.
                        when('/' + META.params.path, {
                            templateUrl: 'views/list.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/crear', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id, {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller',
                        }).
                        when('/' + META.params.path + '/:' + META.params.id + '/edit', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        });
            }]);