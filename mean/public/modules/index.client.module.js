angular.module('index', [])
        .controller('IndexController', ['$scope',
            function($scope)
            {
                $scope.user = window.user;
            }]);
