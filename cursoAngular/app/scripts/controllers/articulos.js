'use strict';

/**
 * @ngdoc function
 * @name cursoAngularApp.controller:ArticulosCtrl
 * @description
 * # ArticulosCtrl
 * Controller of the cursoAngularApp
 */
angular.module('cursoAngularApp')
        .controller('ArticulosCtrl', function($scope) {
            $scope.posts = [
                {
                    title: 'Alimentos buenos para la salud',
                    content: 'Como va eso tio'
                },
                {
                    title: 'Alimentos menos buenos para la salud',
                    content: 'Vamos a eso tio'
                },
                {
                    title: 'Limita tu cantidad de hidratos de carbono',
                    content: 'Aiiii los shawarmas buenos'
                }
            ];
        });
