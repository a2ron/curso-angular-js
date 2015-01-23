'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
        .controller('MainCtrl', function($scope, localStorageService) {
            var tareasEnAlmacen = localStorageService.get('tareas');
            $scope.tareas = tareasEnAlmacen && tareasEnAlmacen.split('\n') || [];
            $scope.$watch('tareas', function()
            {
                localStorageService.add('tareas', $scope.tareas.join('\n'));
            }, true);

            $scope.addTarea = function()
            {
                $scope.tareas.push($scope.tarea);
                $scope.tarea = '';
            };

            $scope.eliminarTarea = function(i)
            {
                $scope.tareas.splice(i, 1);
            };

        });
