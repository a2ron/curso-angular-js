ngGridSummaryPlugin = function(options)
{
    var gridInstance = null;
    var childScope = null;
    var domUtilityService = null;
    var self = this;
    /* TODO: hace falta? */
    function setDefaultTemplateIfNotExists()
    {
        if (!gridInstance.config.footerTemplate) {
            gridInstance.config.footerTemplate = '<div id="as" class="{{gridId}} ngFooterPanel">' +
                    '<div ng-repeat="f in ngGridSummaryPlugin.columns" class="ngCell col{{f.index}} col{{f.index}}t"><div class="ngCellText col{{f.index}} co{{f.index}}t"><span ng-bind="ngGridSummaryPlugin.values[{{f.index}}]"></span></div></div>' +
                    '</div>';
        }
        else
            console.log(gridInstance.config.footerTemplate);
        if (!gridInstance.config.footerRowHeight) {
            gridInstance.config.footerRowHeight = 30;
        }
        domUtilityService.RebuildGrid(childScope, gridInstance);//TODO: no hace nada

    }

    function suma(field)
    {
        var sum = 0;
        angular.forEach(gridInstance.filteredRows, function(row, i) {
            sum += parseInt(row.entity[field]);
        });
        return sum;
    }

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////*/

    this.init = function(_childScope, _gridInstance, services) {

        gridInstance = _gridInstance;
        childScope = _childScope;
        domUtilityService = services.DomUtilityService;

        setDefaultTemplateIfNotExists();

        var columns = gridInstance.config.columnDefs;

        childScope.$parent['ngGridSummaryPlugin'] = {};
        childScope.$parent['ngGridSummaryPlugin'].columns = options.columns;
        childScope.$parent['ngGridSummaryPlugin'].values = [];
        
        //TODO: mejorar la actualización
        function reload() {
            setTimeout(function() {
                angular.forEach(options.columns, function(col, i)
                {
                    childScope.$parent['ngGridSummaryPlugin'].values[col.index] = suma(columns[col.index].field);
                });
                childScope.$apply();
                reload();
            }, 250);
        }
        reload();

    };
};