var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'index', 'apuntes', 'categoriasApuntes','ngLayout','ngGrid','ui.bootstrap']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider)
    {
        $locationProvider.hashPrefix('!');
    }]);

angular.element(document).ready(function()
{
    angular.bootstrap(document, [mainApplicationModuleName]);
});