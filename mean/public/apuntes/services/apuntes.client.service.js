'use strict';

angular.module('example').factory('Apuntes', ['$resource', function($scope, $resource)
    {
        return $resource('apuntes/:apunteId', {
            apunteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            delete: {
                method: 'DELETE'
            }
        });
    }]);