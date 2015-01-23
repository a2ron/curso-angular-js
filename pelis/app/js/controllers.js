'use strict';

/* Controllers */

angular.module('myApp.controllers', []).controller('listaPelisCtrl', ['$scope', 'rtmFactory', function($scope, rtmFactory) {
        $scope.countries = rtmFactory.getCountries();
        $scope.movies = {};

        $scope.loadMovies = function(code)
        {
            rtmFactory.getMovies(code, $scope.query).then(function(response)
            {
                console.log(JSON.stringify(response.data.movies));
                $scope.movies = response.data.movies;
                $scope.activeCode = code;
            });
        };

        $scope.isActive = function(code) {
            return $scope.activeCode === code;
        };

        $scope.loadMovies("es");
    }]);
