'use strict';

angular.module('apuntes').factory('Apuntes', ['$resource', function($scope, $resource)
    {
        return $resource('apuntes/:apunteId', {
            apunteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);