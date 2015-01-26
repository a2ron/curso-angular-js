angular.module('apuntes').controller('ApuntesController', [
    '$scope',
    '$routeParams',
    '$location',
    'Authentication',
    'Apuntes',
    function($scope, $routeParams, $location, Authentication, Apuntes)
    {
        $scope.authentication = Authentication;

        $scope.create = function()
        {
            var apunte = new Apuntes({
                titulo: this.titulo,
                descripcion: this.descripcion
            });

            apunte.$save(function(response)
            {
                $location.path('apuntes/' + response._id);

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function()
        {
            $scope.apuntes = Apuntes.query();
        };


        $scope.findOne = function()
        {
            $scope.apuntes = Apuntes.get({
                apunteId: $routeParams.aputeId
            });
        };

        $scope.update = function()
        {
            $scope.apunte.$update(function(response)
            {
                $location.path('apuntes/' + $scope.apunte._id);

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(apunte)
        {
            if (apunte) {
                apunte.$remove(function()
                {
                    //quitar de la lista
                    for (var i in $scope.apuntes)
                    {
                        if ($scope.apuntes[i] === apunte)
                        {
                            $scope.apuntes.splice(i, 1);
                            break;
                        }
                    }
                });
            } else {
                $scope.apunte.$remove(function()
                {
                    $location.path('apuntes');

                });
            }
        };
    }]);