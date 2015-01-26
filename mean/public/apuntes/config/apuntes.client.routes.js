angular.module('apuntes').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/apuntes', {
                    templateUrl: 'apuntes/views/list-apuntes.client.view.html'
                }).
                when('/apuntes/crear', {
                    templateUrl: 'apuntes/views/crear-apuntes.client.view.html'
                }).
                when('/apuntes/:apunteId', {
                    templateUrl: 'apuntes/views/view-apuntes.client.view.html'
                }).
                when('/apuntes/:apunteId/edit', {
                    templateUrl: 'apuntes/views/edit-apuntes.client.view.html'
                });
    }]);