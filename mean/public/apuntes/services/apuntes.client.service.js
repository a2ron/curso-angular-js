'use strict';

angular.module('apuntes').factory('Apuntes', ['$resource', function($resource) {
        return $resource('api/apuntes/:apunteId', {
            apunteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);

angular.module('apuntes').factory('ApuntesPath', function() {
    return 'apuntes';
});

angular.module('apuntes').factory('ApuntesId', function() {
    return 'apunteId';
});