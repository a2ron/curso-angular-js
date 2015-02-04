var a;
function categoriasController($scope, $routeParams, $location, categoriasApuntesFactory, $filter, apuntesFactory, categoriasApuntesMETA)
{
    controllerBase($scope, $routeParams, $location, categoriasApuntesFactory, categoriasApuntesMETA);

    $scope.findApuntes = function()
    {

        function loadEnd()
        {
            console.log("try");
            if (!$scope.obj._id) {
                setTimeout(loadEnd, 10);
            }
            else {
                $scope.apuntes = apuntesFactory.search({
                    idCategoriaApunte: $scope.obj._id
                });
            }
        }
        loadEnd();
    };
}
var params = {
    nameModule: 'categoriasApuntes',
    path: 'categorias',
    id: 'categoriaApunteId',
    pathAPI: 'api/categorias/:categoriaApunteId',
    viewParams: {
        name: 'Categorías',
        nameSingular: 'Categoría',
        path: 'categorias'//redundante pero necesario
    },
    injection: categoriasController
};

moduleCrudBase(params)/* routes */
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
            }
        ]);