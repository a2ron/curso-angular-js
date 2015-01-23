'use strict';

/**
 * @ngdoc function
 * @name cursoAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cursoAngularApp
 */
angular.module('cursoAngularApp').controller('MainCtrl', function($scope) {
    var baseURL = 'http://lorempixel.com/960/450/';
    $scope.setInterval = 5000;

    $scope.slides = [
        {
            title: 'Aprende a mantenerte en forma',
            image: baseURL + 'sports/',
            text: '¡Practica algún deporte todos los días'

        },
        {
            title: 'Buena alimentación',
            image: baseURL + 'food/',
            text: '¡Come fruta y verdura!'

        },
        {
            title: 'En contacto con la naturaleza',
            image: baseURL + 'nature/',
            text: '¡Sal al campo!'

        }
    ];

    var baseURL2 = 'http://lorempixel.com/200/200/';
    $scope.contenido = [
        {
            img: baseURL2 + 'people',
            title: 'Sobre Nosotros',
            sumario: 'Somos una empresa buena'
        }, 
        {
            img: baseURL2 + 'business',
            title: 'Nuestros Servicios',
            sumario: 'Ofrecemos asesoría'
        }, 
        {
            img: baseURL2 + 'transport',
            title: 'Contactanos',
            sumario: 'Plaza Central, Durance, Zip-1121'
        }
    ];
});
