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