function apuntesController($scope, $routeParams, $location, categoriasApuntesFactory, $filter, apuntesFactory, apuntesMETA)
{
    controllerBase($scope, $routeParams, $location, apuntesFactory, apuntesMETA);

    $scope.findCategorias = function()
    {
        $scope.cats = categoriasApuntesFactory.query();

        function loadEnd()
        {
            if ($scope.cats.length <= 0) {
                setTimeout(loadEnd, 200);
            }
            else {
                $scope.categoriaApunte = $scope.cats[0];
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