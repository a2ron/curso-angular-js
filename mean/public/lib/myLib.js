function controllerBase($scope, $routeParams, $location, Factory, Meta)
{
    $scope.loadStamp = Date.now();

    //PARAMS FOR VIEW
    angular.extend($scope, Meta.viewParams);

    if ($routeParams[Meta.id])
        $scope.viewEditOrCreate = 'Editar';
    else
        $scope.viewEditOrCreate = 'Crear';

    //FUNCTIONS
    $scope.create = function()
    {
        $scope.obj.$save(function(response)
        {
            $scope.go(Meta.path);

        }, function(errorResponse) {
            $scope.error = 'Error al guardar';
        });
    };

    $scope.find = function(params)
    {
        $scope.objs = Factory.query(params.filter, params.onSuccess);
    };


    $scope.findOne = function(onSuccess)
    {
        var p = {};
        p[Meta.id] = $routeParams[Meta.id];
        $scope.obj = Factory.get(p, onSuccess);
    };

    $scope.update = function()
    {
        $scope.obj.$update(function(response)
        {
            $scope.go(Meta.path);

        }, function(errorResponse) {
            $scope.error = 'Error al guardar';
        });
    };

    $scope.go = function(path)
    {
        $location.path(path);
    };

    $scope.onSubmit = function(form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid) {
            $scope.action();
        }
    };

    $scope.action = function() {

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
                $scope.go(Meta.path);
            });
        }
    };

    $scope.initViewEditOrCreate = function()
    {
        if ($scope.viewEditOrCreate === 'Editar') {
            $scope.findOne();
            $scope.action = $scope.update;
        }
        else {
            $scope.action = $scope.create;
            $scope.obj = new Factory({});
        }
    };

    $scope.actionButtons = {
        type: "actions",
        items: [
            {type: 'button', style: 'btn-info', title: 'Lista', onClick: 'go("' + Meta.path + '")'},
            {type: 'submit', style: 'btn-success', title: 'Guardar'},
            {type: 'button', style: 'btn-danger', title: 'Borrar', onClick: "delete()"}
        ]
    };

    $scope.itemSel = null;
    $scope.changeSel = function(id)
    {
        $scope.itemSel = id;
    };
    
    return $scope;

}

function moduleCrudBase(p)
{
    var injection = (p.injection) ? p.injection : ['$scope', '$routeParams', '$location', p.nameModule + "Factory", p.nameModule + 'META', controllerBase];
    return angular.module(p.nameModule, ['schemaForm'])
            .factory(p.nameModule + "Factory", ['$resource', function($resource) {
                    var actions = {
                        update: {
                            method: 'PUT'
                        }
                    };
                    if (p.moreActionsREST)
                        angular.extend(actions, p.moreActionsREST);
                    var params = {};
                    params[p.id] = '@_id';
                    return $resource(p.pathAPI, params, actions);
                }])
            .provider(p.nameModule + 'META', function() {
                this.params = p;
                this.$get = function() {
                    return this.params;
                };
            })
            .controller(p.nameModule + "Controller", injection);
}