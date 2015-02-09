
function controllerBase($scope, $routeParams, $location, Factory, Meta)
{
    $scope.params = Meta.viewParams;

    $scope.create = function()
    {
        $scope.obj.$save(function(response)
        {
            $location.path(Meta.path);

        }, function(errorResponse) {
            $scope.error = 'Error al guardar';
        });
    };

    $scope.find = function()
    {
        $scope.objs = Factory.query();
    };


    $scope.findOne = function()
    {
        var p = {};
        p[Meta.id] = $routeParams[Meta.id];
        $scope.obj = Factory.get(p);
    };

    $scope.update = function()
    {
        $scope.obj.$update(function(response)
        {
            $location.path(Meta.path);

        }, function(errorResponse) {
            $scope.error = 'Error al guardar';
        });
    };

    $scope.delete = function(obj)
    {
        if (obj) {
            obj.$remove(function()
            {
                //quitar de la lista
                for (var i in $scope.objs)
                {
                    if ($scope.objs[i] === obj)
                    {
                        $scope.objs.splice(i, 1);
                        break;
                    }
                }
            });
        } else {
            $scope.obj.$remove(function()
            {
                $location.path(Meta.path);
            });
        }
    };
}

function moduleCrudBase(p)
{
    var injection = (p.injection) ? p.injection : ['$scope', '$routeParams', '$location', p.nameModule + "Factory", p.nameModule + 'META', controllerBase];
    return angular.module(p.nameModule, ['schemaForm'])
            .factory(p.nameModule + "Factory", ['$resource', function($resource) {
                    var params = {};
                    params[p.id] = '@_id';
                    return $resource(p.pathAPI, params, {
                        update: {
                            method: 'PUT'
                        },
                        search: {
                            url: 'api/apuntes/cat/:idCategoriaApunte',
                            method: 'GET',
                            isArray: true
                        }
                    });
                }])
            .provider(p.nameModule + 'META', function() {
                this.params = p;
                this.$get = function() {
                    return this.params;
                };
            })
            .controller(p.nameModule + "Controller", injection);
}