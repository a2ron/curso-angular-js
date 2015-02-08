function apuntesController($scope, $routeParams, $location, categoriasApuntesFactory, $filter, apuntesFactory, apuntesMETA, $http)
{
    controllerBase($scope, $routeParams, $location, apuntesFactory, apuntesMETA);

    var cats = [];
    $scope.findOne = function()
    {
        var p = {};
        p[apuntesMETA.id] = $routeParams[apuntesMETA.id];
        $scope.obj = apuntesFactory.get(p);

        $scope.cats = categoriasApuntesFactory.query();

        function loadEnd()
        {
            if ($scope.cats.length <= 0) {
                setTimeout(loadEnd, 200);
            }
            else {
                $scope.categoriaApunte = $scope.cats[0];
                for (var i in $scope.cats)
                {
                    var cat = $scope.cats[i];
                    if (cat.titulo) {
                        cats.push({
                            name: cat.titulo,
                            value: cat._id
                        });
                    }
                }
                console.log(cats);
                $scope.$apply();//for update interface
            }
        }
        loadEnd();

    };

    $scope.create = function()
    {
        var obj = new apuntesFactory({
            titulo: this.titulo,
            descripcion: this.descripcion,
            idCategoriaApunte: $scope.categoriaApunte._id
        });

        obj.$save(function(response)
        {
            $location.path(apuntesMETA.path + '/' + response._id);

        }, function(errorResponse) {
            $scope.error = 'Error al guardar';
        });
    };

    //form prueba
    $scope.editFields = [
        {
            key: 'titulo',
            type: 'input',
            templateOptions: {
                placeholder: 'Título',
                label: 'Título'
            }
        },
        {
            key: 'descripcion',
            type: 'input',
            templateOptions: {
                placeholder: 'Descripción',
                label: 'Descripción'
            }
        },
        {
            key: 'idCategoriaApunte',
            type: 'select',
            templateOptions: {
                label: 'Categoría',
                options: cats
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
                            templateUrl: 'views/create.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id, {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id + '/edit', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        });
            }]);