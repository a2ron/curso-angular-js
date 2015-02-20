var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'index', 'apuntes', 'categoriasApuntes', 'ngLayout', 'ngGrid', 'ui.bootstrap']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider)
    {
        $locationProvider.hashPrefix('!');
    }]);

angular.element(document).ready(function()
{
    angular.bootstrap(document, [mainApplicationModuleName]);
});

/* For initialice format in datepickerPopup*/
angular.module(mainApplicationModuleName).directive('datepickerPopup', function(dateFilter, datepickerPopupConfig) {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            var dateFormat = attr.datepickerPopup || datepickerPopupConfig.datepickerPopup;
            ngModel.$formatters.push(function(value) {
                return dateFilter(value, dateFormat);
            });
        }
    };
});

