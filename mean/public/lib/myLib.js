
function controllerBase($scope, $routeParams, $location, Factory, Meta)
{
    $scope.params = Meta;

    $scope.create = function()
    {
        var obj = new Factory({
            titulo: this.titulo,
            descripcion: this.descripcion
        });

        obj.$save(function(response)
        {
            $location.path(Meta.path + '/' + response._id);

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
            $location.path(Meta.path + '/' + $scope.obj._id);

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
    return angular.module(p.nameModule, [])
            .factory(p.name, ['$resource', function($resource) {
                    var params = {};
                    params[p.id] = '@_id';
                    return $resource(p.pathAPI, params, {
                        update: {
                            method: 'PUT'
                        }
                    });
                }])
            .factory(p.name + 'META', function() {
                return p;
            })
            .controller(p.nameController, [
                '$scope',
                '$routeParams',
                '$location',
                p.name,
                p.name + 'META',
                controllerBase
            ]);
}
