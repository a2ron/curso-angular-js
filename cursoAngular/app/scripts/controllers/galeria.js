'use strict';

/**
 * @ngdoc function
 * @name cursoAngularApp.controller:GaleriaCtrl
 * @description
 * # GaleriaCtrl
 * Controller of the cursoAngularApp
 */
angular.module('cursoAngularApp').controller('GaleriaCtrl', function($scope) {
    var pictures = $scope.pictures = [];

    var baseURL = 'http://lorempixel.com/300/180/';

    var titles = ['Comida Sana', 'Salud y trabajo', 'Vida en la ciudad'];

    var keywords = ['food', 'business', 'city'];

    var dummyText = 'Lorena ipsumi Dolores';

    $scope.addPics = function(i)
    {
        pictures.push({
            url: baseURL + keywords[i],
            title: titles[i],
            summary: dummyText
        });
    };

    for (var i = 0; i < 3; i++)
    {
        $scope.addPics(i);
    }
    
    //for ratings
    $scope.rate = 0;
    $scope.max = 10;
    $scope.isReadonly = false;
});
