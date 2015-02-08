function categoriasController($scope, $routeParams, $location, categoriasApuntesFactory, $filter, apuntesFactory, categoriasApuntesMETA)
{
    controllerBase($scope, $routeParams, $location, categoriasApuntesFactory, categoriasApuntesMETA);

    $scope.findApuntes = function()
    {

        function loadEnd()
        {
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

    if ($routeParams[categoriasApuntesMETA.id])
        $scope.view = 'Editar';
    else
        $scope.view = 'Nueva';
    $scope.initView = function()
    {
        if ($scope.view === 'Editar') {
            $scope.findOne();
            $scope.action = $scope.update;
        }
        else {
            $scope.action = $scope.create;
            $scope.obj = new categoriasApuntesFactory({});
        }
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
        }
    ];
}
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
            }
        ],
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
                            templateUrl: 'views/edit.client.view.html',
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