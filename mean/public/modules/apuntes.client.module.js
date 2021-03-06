function apuntesController($scope, $routeParams, $location, categoriasApuntesFactory, apuntesFactory, apuntesMETA, filterFilter)
{
    controllerBase($scope, $routeParams, $location, apuntesFactory, apuntesMETA);


    $scope.fin = new Date();
    $scope.ini = new Date($scope.fin.getFullYear(), $scope.fin.getMonth(), 1);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
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
                },
                datetime: {
                    title: 'Fecha',
                    "type": "string",
                    "format": "date"
                },
                computable: {
                    title: "Computable",
                    type: 'boolean',
                    default: true
                },
                deuda: {
                    title: "En deuda",
                    type: 'boolean',
                    default: false
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
            {
                "key": "datetime"
            },
            'computable',
            {
                "type": "conditional",
                "condition": "!obj.computable",
                "items": [
                    {
                        "key": "deuda"
                    }
                ]
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
        $scope.objs = apuntesFactory.query(function(res)
        {
            //preparing for angular-schema-form
            angular.forEach(res, function(value, key) {
                res[key].categoriaTitulo = res[key].idCategoriaApunte.titulo;
            });
        });
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
                key: 'categoriaTitulo'
            }
        ],
        path: 'apuntes'//redundante pero necesario
    },
    injection: apuntesController,
    moreActionsREST: {
        filter: {
            url: 'api/apuntes/filter/:idCategoriaApunte/:yearIni/:monthIni/:dayIni/:yearFin/:monthFin/:dayFin',
            method: 'GET',
            isArray: true
        },
        summary: {
            url: 'api/apuntes/info/summary',
            method: 'GET',
            isArray: false
        }
    }
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