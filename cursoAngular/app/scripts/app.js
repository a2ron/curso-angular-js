'use strict';

/**
 * @ngdoc overview
 * @name cursoAngularApp
 * @description
 * # cursoAngularApp
 *
 * Main module of the application.
 */
angular
        .module('cursoAngularApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
            'ngGrid'
        ])
        .controller('menuCtrl', ['$scope', '$location', function($scope, $location) {

                $scope.navLinks = [{
                        link: '#/home',
                        Title: 'Home'
                    }, {
                        link: '#/about',
                        Title: 'About Us'
                    }, {
                        link: '#/articulos',
                        Title: 'Artículos'
                    }, {
                        link: '#/galeria',
                        Title: 'Galería'
                    }, {
                        link: '#/miembros',
                        Title: 'Miembros'
                    }];

                $scope.navClass = function(page) {
                    var currentRoute = $location.path().substring(1) || 'home';
                    console.log(currentRoute);
                    return page === '#/' + currentRoute ? 'active' : '';
                };


            }])
        .config(function($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    .when('/about', {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
                    })
                    .when('/articulos', {
                        templateUrl: 'views/articulos.html',
                        controller: 'ArticulosCtrl'
                    })
                    .when('/about', {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
                    })
                    .when('/galeria', {
                        templateUrl: 'views/galeria.html',
                        controller: 'GaleriaCtrl'
                    })
                    .when('/miembros', {
                        templateUrl: 'views/miembros.html',
                        controller: 'MiembrosCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });
