function categoriasController($scope, $routeParams, $location, categoriasApuntesFactory, filterFilter, apuntesFactory, categoriasApuntesMETA)
{
    var parent = controllerBase($scope, $routeParams, $location, categoriasApuntesFactory, categoriasApuntesMETA);

    $scope.apuntes = [];
    $scope.findApuntes = function(onSuccess)
    {
        var filter = {};
        filter.idCategoriaApunte = ($scope.obj) ? $scope.obj._id : 0;
        
        filter.yearIni = $scope.ini.getFullYear();
        filter.monthIni = $scope.ini.getMonth()+1;
        filter.dayIni = $scope.ini.getDate();
        
        filter.yearFin = $scope.fin.getFullYear();
        filter.monthFin = $scope.fin.getMonth()+1;
        filter.dayFin = $scope.fin.getDate();
        
        $scope.apuntes = apuntesFactory.filter(filter, onSuccess);
    };

    var find = parent.find;
    $scope.find = function()
    {
        find(function()
        {
            $scope.findApuntes(function()
            {
                angular.forEach($scope.objs, function(obj, iObj)
                {
                    $scope.objs[iObj].sum = 0;
                    $scope.objs[iObj].count = 0;
                    $scope.objs[iObj].income = 0;
                    $scope.objs[iObj].outcome = 0;
                    var ac = filterFilter($scope.apuntes, {idCategoriaApunte: {_id: obj._id}});
                    angular.forEach(ac, function(a, key) {
                        $scope.objs[iObj].sum += a.importe;
                        $scope.objs[iObj].count++;
                        if (a.importe > 0)
                            $scope.objs[iObj].income += a.importe;
                        else
                            $scope.objs[iObj].outcome += a.importe;
                    });
                });
            });
        });
    };


    $scope.initViewEditOrCreate = function()
    {
        if ($scope.viewEditOrCreate === 'Editar') {
            $scope.findOne(function()
            {
                $scope.findApuntes();
            });
            $scope.action = $scope.update;
        }
        else {
            $scope.obj = new Factory({});
            $scope.action = $scope.create;
        }
    };

    $scope.changeSel = function(valueSel)
    {
        if (valueSel) {
            $scope.itemSel = $scope.itemSel !== valueSel ? valueSel : '0';
        }
        console.log($scope.itemSel);
        $scope.apuntesFilter = [];
        var showns = filterFilter($scope.apuntes, {idCategoriaApunte: $scope.itemSel});
        angular.forEach(showns, function(value, key) {
            $scope.apuntesFilter.push(showns[key]);
        });

    };

    ////////////////////////////////////////////////////////////////////////////////////

    $scope.schema = {
        type: "object",
        properties: {
            titulo: {type: "string", minLength: 2, title: "Título", required: true},
            descripcion: {
                type: "string",
                title: "Descripción"
            }
        }
    };
    $scope.form = [
        '*',
        $scope.actionButtons
    ];

    ////////////////////////////////////////////////////////////////////////////////////

    $scope.gridOptions = {
        data: 'apuntes',
        columnDefs: [
            {field: 'idCategoriaApunte.titulo', displayName: 'Categoría'},
            {field: 'titulo', displayName: 'Título'},
            {field: 'descripcion', displayName: 'Descripción'},
            {field: 'importe', displayName: 'Total'}
        ],
        showGroupPanel: true,
        i18n: 'es'
//        aggregateTemplate: "views/ngGrid-row-aggregate.template.html"
    };

//    $scope.aggFunc = function(row) {
//        var total = 0;
//        angular.forEach(row.children, function(cropEntry) {
//            total += cropEntry.entity.importe;
//        });
//        return total.toString();
//    };
//    $scope.entryMaybePlural = function(row) {
//        if (row.children.length > 1)
//        {
//            return "entries";
//        }
//        else
//            return "entry";
//    };

    $scope.fin = new Date();
    $scope.ini = new Date($scope.fin.getFullYear(),$scope.fin.getMonth(),1);

    $scope.dateOptions = {
    formatYear: 'yy',
        startingDay: 1
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
}


/**********************************************************************************************************/

var params = {
    nameModule: 'categoriasApuntes',
    path: 'categorias',
    id: 'categoriaApunteId',
    pathAPI: 'api/categorias/:categoriaApunteId',
    viewParams: {
        name: 'Categorías',
        nameSingular: 'Categoría',
        listFields: [
            {
                title: 'Título',
                key: 'titulo'
            },
            {
                title: 'Descripción',
                key: 'descripcion'
            },
            {
                title: 'Income',
                key: 'income'
            },
            {
                title: 'Outcome',
                key: 'outcome'
            },
            {
                title: 'Total',
                key: 'sum'
            }
        ],
        path: 'categorias'//redundante pero necesario
    },
    injection: categoriasController
};

moduleCrudBase(params)/* routes */
        .config(['$routeProvider', params.nameModule + 'METAProvider',
            function($routeProvider, META) {
                $routeProvider.
                        when('/' + META.params.path, {
                            templateUrl: 'views/listCategorias.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/crear', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id, {
                            templateUrl: 'views/editCategoria.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        }).
                        when('/' + META.params.path + '/:' + META.params.id + '/edit', {
                            templateUrl: 'views/edit.client.view.html',
                            controller: META.params.nameModule + 'Controller'
                        });
            }
        ]);