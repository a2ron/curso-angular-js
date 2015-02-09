function apuntesController($scope, $routeParams, $location, categoriasApuntesFactory, apuntesFactory, apuntesMETA, filterFilter)
{
    controllerBase($scope, $routeParams, $location, apuntesFactory, apuntesMETA);

    function loadCategorias()
    {
        var cats = categoriasApuntesFactory.query();

        function loadEnd()
        {
            if (cats.length <= 0) {
                setTimeout(loadEnd, 200);
            }
            else {
                var categories = [];
                $scope.categoriaApunte = cats[0];
                categories.push({
                    name: 'Seleccione una',
                    value: 0
                });
                for (var i in cats)
                {
                    var cat = cats[i];
                    if (cat.titulo) {
                        categories.push({
                            name: cat.titulo,
                            value: cat._id
                        });
                    }
                }
                $scope.schema = {
                    type: "object",
                    properties: {
                        titulo: {type: "string", minLength: 2, title: "Título"},
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
                    }
                ];

                $scope.$apply();//for update interface
            }
        }
        loadEnd();
    }



    $scope.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid) {
            $scope.action();
        }
        else
            alert('Algún campo no es correcto...');
    };

    if ($routeParams[apuntesMETA.id])
        $scope.view = 'Editar';
    else
        $scope.view = 'Nuevo';
    $scope.initView = function()
    {
        if ($scope.view === 'Editar') {
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

    //SCHEMA FOR FORM
    $scope.editFields = [
        {
            key: 'titulo',
            type: 'input',
            templateOptions: {
                placeholder: 'Título',
                label: 'Título',
                required: true
            }
        },
        {
            key: 'descripcion',
            type: 'textarea',
            templateOptions: {
                placeholder: 'Descripción',
                label: 'Descripción'
            }
        },
        {
            key: 'idCategoriaApunte',
            type: 'select',
            validators: {
                selectOne: function(viewValue, modelValue) {
                    var value = modelValue || viewValue;
                    var selected = filterFilter(categories, {value: value});
                    return value !== 0 && selected.length === 1;
                }
            },
            templateOptions: {
                label: 'Categoría',
                required: true
            }
        }
    ];


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