angular.module('apuntes').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/apuntes', {
                    templateUrl: 'apuntes/views/list-apuntes.client.view.html'
                }).
                when('/apuntes/crear', {
                    templateUrl: 'apuntes/views/create-apunte.client.view.html'
                }).
                when('/apuntes/:apunteId', {
                    templateUrl: 'apuntes/views/view-apunte.client.view.html'
                }).
                when('/apuntes/:apunteId/edit', {
                    templateUrl: 'apuntes/views/edit-apuntes.client.view.html'
                });
    }]);