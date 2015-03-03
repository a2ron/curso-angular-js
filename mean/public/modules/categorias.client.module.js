var scope = angular.element().scope();

function categoriasController($scope, $routeParams, $location, categoriasApuntesFactory, filterFilter, apuntesFactory, categoriasApuntesMETA, apuntesMETA)
{
    var parent = controllerBase($scope, $routeParams, $location, categoriasApuntesFactory, categoriasApuntesMETA);

    $scope.apuntes = [];
    $scope.findApuntes = function(onSuccess)
    {
        var filter = {};
        filter.idCategoriaApunte = ($scope.obj) ? $scope.obj._id : 0;

        filter.yearIni = $scope.ini.getFullYear();
        filter.monthIni = $scope.ini.getMonth() + 1;
        filter.dayIni = $scope.ini.getDate();

        filter.yearFin = $scope.fin.getFullYear();
        filter.monthFin = $scope.fin.getMonth() + 1;
        filter.dayFin = $scope.fin.getDate();

        $scope.apuntes = apuntesFactory.filter(filter, onSuccess);
        $scope.apuntesFilter = [];

        $scope.summary = apuntesFactory.summary();

    };

    var find = parent.find;
    $scope.find = function()
    {
        //parent::find
        find({
            filter: {computable: true},
            onSuccess: function()
            {
                $scope.findApuntes(function()
                {
                    $scope.tSum = 0;
                    $scope.tSumC = 0;
                    $scope.tIn = 0;
                    $scope.tExpense = 0;
                    $scope.tInC = 0;
                    $scope.tExpenseC = 0;
                    angular.forEach($scope.objs, function(obj, iObj)
                    {
                        $scope.objs[iObj].sum = 0;
                        $scope.objs[iObj].sumC = 0;
                        $scope.objs[iObj].count = 0;
                        $scope.objs[iObj].income = 0;
                        $scope.objs[iObj].incomeC = 0;
                        $scope.objs[iObj].expense = 0;
                        $scope.objs[iObj].expenseC = 0;
                        var ac = filterFilter($scope.apuntes, {idCategoriaApunte: {_id: obj._id}});
                        angular.forEach(ac, function(a, key) {
                            if (!a.deuda) {
                                $scope.objs[iObj].sum += a.importe;
                                if (a.computable)
                                    $scope.objs[iObj].sumC += a.importe;
                                $scope.objs[iObj].count++;
                                if (a.importe > 0) {
                                    $scope.objs[iObj].income += a.importe;
                                    if (a.computable)
                                        $scope.objs[iObj].incomeC += a.importe;
                                }

                                else {
                                    $scope.objs[iObj].expense += a.importe;
                                    if (a.computable)
                                        $scope.objs[iObj].expenseC += a.importe;
                                }
                            }
                        });
                        $scope.tSum += $scope.objs[iObj].sum;
                        $scope.tSumC += $scope.objs[iObj].sumC;
                        $scope.tIn += $scope.objs[iObj].income;
                        $scope.tExpense += $scope.objs[iObj].expense;
                        $scope.tInC += $scope.objs[iObj].incomeC;
                        $scope.tExpenseC += $scope.objs[iObj].expenseC;
                    });

                });
            }
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
            $scope.obj = new categoriasApuntesFactory({});
            $scope.action = $scope.create;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    $scope.schema = {
        type: "object",
        properties: {
            titulo: {type: "string", minLength: 2, title: "Título", required: true},
            descripcion: {
                type: "string",
                title: "Descripción"
            },
            computable: {
                title: "Computable",
                type: 'boolean',
                default: true
            }
        }
    };
    $scope.form = [
        '*',
        $scope.actionButtons
    ];

    var cellFilter = 'number:2';

    ////////////////////////////////////////////////////////////////////////////////////

    $scope.gridOptions = {
        data: 'apuntesFilter',
        columnDefs: [
            {field: 'idCategoriaApunte.titulo', displayName: 'Categoría'},
            {field: 'titulo', displayName: 'Título', cellLinkPath: apuntesMETA.path},
//            {field: 'descripcion', displayName: 'Descripción'},
            {field: 'computable', displayName: 'Computable',
                cellTemplate: '<div class="ng-grid-cell-checkbox"><input disabled type="checkbox" ng-model="row.entity.computable"></div>'
            },
            {field: 'importe', displayName: 'Importe', cellFilter: cellFilter, cellClass: 'cellNumber'}
        ],
        showGroupPanel: true,
        plugins: [
            new ngGridFlexibleHeightPlugin()
        ],
        i18n: 'es',
        rowTemplate: 'views/ng-grid-row.template.html'
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
    $scope.ini = new Date($scope.fin.getFullYear(), $scope.fin.getMonth(), 1);

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };


    $scope.hasCellLinkPath = function(col, v)
    {
        return col.colDef.hasOwnProperty('cellLinkPath');
    };
    $scope.noHasCellLinkPath = function(col, v)
    {
        return !$scope.hasCellLinkPath(col, v);
    };

    $scope.gridOptionsCategorias = {
        init: 'find()',
        data: 'objs',
        columnDefs: [
            {field: 'titulo', displayName: 'Título', cellLinkPath: categoriasApuntesMETA.path},
            /* {field: 'income', displayName: 'In', cellFilter: cellFilter, cellClass: 'cellNumber'},
             {field: 'expense', displayName: 'Out', cellFilter: cellFilter, cellClass: 'cellNumber'},*/
//            {field: 'sum', displayName: 'Total', cellFilter: cellFilter, cellClass: 'cellNumber'},
            {field: 'incomeC', displayName: 'In', cellFilter: cellFilter, cellClass: 'cellNumber'},
            {field: 'expenseC', displayName: 'Out', cellFilter: cellFilter, cellClass: 'cellNumber'},
            {field: 'sumC', displayName: 'Total', cellFilter: cellFilter, cellClass: 'cellNumber'}
        ],
        showFooter: true,
        footerRowHeight: 30,
        plugins: [
            new ngGridFlexibleHeightPlugin(),
            new ngGridSummaryPlugin({
                columns: [
                    {index: 1},
                    {index: 2},
                    {index: 3}
//                    {index: 4}
//                    {index: 5},
//                    {index: 6}
                ]
            })
        ],
        //Callback for when you want to validate something after selection.
        afterSelectionChange: function(row) {
            $scope.apuntesFilter = filterFilter($scope.apuntesFilter, {idCategoriaApunte: {_id: "!" + row.entity._id}});

            if (row.selected)
            {
                var showns = filterFilter($scope.apuntes, {idCategoriaApunte: {_id: row.entity._id}});
                angular.forEach(showns, function(value, key) {
                    $scope.apuntesFilter.push(showns[key]);
                });
            }
            $(window).resize();//for ng-show ng-grid bug
        },
        i18n: 'es',
        multiSelect: false,
        footerTemplate: 'views/ng-grid-footer.template.html',
        rowTemplate: 'views/ng-grid-row.template.html'
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
                title: 'In',
                key: 'income'
            },
            {
                title: 'Out',
                key: 'expense'
            },
            {
                title: 'Total',
                key: 'sum'
            },
            {
                title: 'In ©',
                key: 'incomeC'
            },
            {
                title: 'Out ©',
                key: 'expenseC'
            },
            {
                title: 'Total ©',
                key: 'sumC'
            }
        ]
        ,
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