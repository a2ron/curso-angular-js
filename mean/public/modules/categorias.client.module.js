moduleCrudBase({
    nameModule: 'categoriasApuntes',
    path: 'categorias',
    id: 'categoriaApunteId',
    pathAPI: 'api/categorias/:categoriaApunteId',
    name: 'Categorías',
    nameSingular: 'Categoría',
    nameController: 'CategoriasApuntesController'
}).config(['$routeProvider',
    function($routeProvider) {
        var nameController = 'CategoriasApuntesController';
        var path = 'categorias';
        var id = 'categoriaApunteId';

        $routeProvider.
                when('/' + path, {
                    templateUrl: 'views/list.client.view.html',
                    controller: nameController
                }).
                when('/' + path + '/crear', {
                    templateUrl: 'views/create.client.view.html',
                    controller: nameController
                }).
                when('/' + path + '/:' + id, {
                    templateUrl: 'views/view.client.view.html',
                    controller: nameController
                }).
                when('/' + path + '/:' + id + '/edit', {
                    templateUrl: 'views/edit.client.view.html',
                    controller: nameController
                });
    }]);