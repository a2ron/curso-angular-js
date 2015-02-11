function apuntesController($scope, $routeParams, $location, categoriasApuntesFactory, apuntesFactory, apuntesMETA, filterFilter)
{
    controllerBase($scope, $routeParams, $location, apuntesFactory, apuntesMETA);

    var categories = [];
    function defSchema()
    {
        //definir el schema del form ahora que tengo las categorias
        $scope.schema = {
            type: "object",
            properties: {
                titulo: {
                    type: "string",
                    minLength: 2,
                    title: "Título",
                    required: true
                },
                descripcion: {
                    type: "string",
                    title: "Descripción"
                },
                importe: {
                    title: "Importe",
                    type: 'number',
                    required: true
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
            'importe',
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
                categories = [];
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
                defSchema();
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


    $scope.find = function()
    {
        $scope.objs = apuntesFactory.query();
        //cargar el nombre de la categoria
        loadCategorias();

        function loadEnd()
        {
            console.log('loadEnd');
            if ($scope.objs.length <= 0) {
                setTimeout(loadEnd, 200);
            }
            else {
                for (var i in $scope.objs)
                {
                    console.log($scope.objs[i]);
                    if ($scope.objs[i].idCategoriaApunte) {
                        var categ = filterFilter(categories, {value: $scope.objs[i].idCategoriaApunte})[0];
                        if (categ)
                            $scope.objs[i].categoriaName = categ.name;
                    }
                    $scope.$apply();
                }
            }
        }
        loadEnd();
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
                title: 'Importe',
                key: 'importe'
            },
            {
                title: 'Categoría',
                key: 'categoriaName'
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
            }
        ]);