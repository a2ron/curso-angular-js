
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

function moduleCrudBase2(p)
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
                'Categorías',
                '$filter',
                p.name,
                p.name + 'META',
                controllerBase2
            ]);
}

function controllerBase2($scope, $routeParams, $location, categorias, $filter, Factory, Meta)
{
    $scope.params = Meta;

    $scope.findCategorias = function()
    {
        $scope.cats = categorias.query();

        function loadEnd()
        {
            if ($scope.cats.length <= 0) {
                setTimeout(loadEnd, 200);
            }
            else {
                $scope.categoriaApunte = $scope.cats[0];
                $scope.$apply();
            }
        }
        loadEnd();

    };

    $scope.create = function()
    {
        var obj = new Factory({
            titulo: this.titulo,
            descripcion: this.descripcion,
            idCategoriaApunte: $scope.categoriaApunte._id
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