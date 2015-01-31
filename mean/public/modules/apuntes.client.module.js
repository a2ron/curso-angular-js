angular.module('apuntes', [])
        .factory('Apuntes', ['$resource', function($resource) {
                return $resource('api/apuntes/:apunteId', {
                    apunteId: '@_id'
                }, {
                    update: {
                        method: 'PUT'
                    }
                });
            }])
        .factory('ApuntesMETA', function() {
            return {
                path: 'apuntes',
                id: 'apunteId'
            };
        })
        .controller('ApuntesController', [
            '$scope',
            '$routeParams',
            '$location',
            'Apuntes',
            'ApuntesMETA',
            controller
        ])
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                        when('/apuntes', {
                            templateUrl: 'views/list-apuntes.client.view.html'
                        }).
                        when('/apuntes/crear', {
                            templateUrl: 'views/create-apunte.client.view.html'
                        }).
                        when('/apuntes/:apunteId', {
                            templateUrl: 'views/view-apunte.client.view.html'
                        }).
                        when('/apuntes/:apunteId/edit', {
                            templateUrl: 'views/edit-apunte.client.view.html'
                        });
            }]);