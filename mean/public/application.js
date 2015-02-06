var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'index', 'apuntes', 'categoriasApuntes', 'formly', 'formlyBootstrap']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider)
    {
        $locationProvider.hashPrefix('!');
    }]);

angular.element(document).ready(function()
{
    angular.bootstrap(document, [mainApplicationModuleName]);
});