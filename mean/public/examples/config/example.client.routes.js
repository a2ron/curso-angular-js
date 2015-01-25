angular.module('example').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when(
                '/', {
                    templateUrl: 'examples/views/example.client.view.html'
                }).otherwise({
            redirectTo: '/'
        });
    }]);