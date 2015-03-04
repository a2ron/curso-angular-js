angular.module('index', []).controller('IndexController', ['$scope', '$location',
    function($scope, $location)
    {
        $scope.menu = [{
                "title": "Resumen",
                "path": "home"
            },
            {
                "title": "Apuntes",
                "path": "apuntes"
            }, {
                "title": "Categorias",
                "path": "categorias"
            }];

        $scope.menuItemActive = function(_path)
        {
            var path = $location.$$path.split('/');
            return (path[1] && path[1] === _path) ? 'active' : '';
        };




    }
]);
