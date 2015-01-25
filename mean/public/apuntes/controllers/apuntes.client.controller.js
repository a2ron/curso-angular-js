angular.module('apuntes').controller('ApuntesController', [
    '$scope',
    '$routeParams',
    '$location',
    'Authentication',
    'Articles',
    function($scope, $routeParams, $location, Authentication, Articles)
    {
        $scope.name = Authentication.user ? Authentication.user.nombre : 'Application MEAN';
    }]);