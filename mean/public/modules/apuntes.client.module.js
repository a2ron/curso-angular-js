moduleCrudBase2({
    nameModule: 'apuntes',
    path: 'apuntes',
    id: 'apunteId',
    pathAPI: 'api/apuntes/:apunteId',
    name: 'Apuntes',
    nameSingular: 'Apunte',
    nameController: 'ApuntesController'
}).config(['$routeProvider',
    function($routeProvider) {
        var path = 'apuntes';
        var id = 'apunteId';
        var nameController = 'ApuntesController';

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