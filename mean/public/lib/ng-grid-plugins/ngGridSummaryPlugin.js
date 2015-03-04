ngGridSummaryPlugin = function()
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
        if (!gridInstance.config.footerRowHeight) {
            gridInstance.config.footerRowHeight = 30;
        }
        domUtilityService.RebuildGrid(childScope, gridInstance);//TODO: no hace nada

    }

    function suma(field)
    {
        var sum = 0;
        angular.forEach(gridInstance.filteredRows, function(row, i) {
            sum += parseFloat(row.entity[field]);
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
        childScope.$parent['ngGridSummaryPlugin'].values = [];

        //TODO: mejorar la actualización
        function reload() {
            setTimeout(function() {
                angular.forEach(columns, function(col, i)
                {
                    if (col.ngGridSummaryPlugin)
                        childScope.$parent['ngGridSummaryPlugin'].values[i] = suma(columns[i].field);
                });
                childScope.$apply();
                reload();
            }, 500);
        }
        reload();

    };
};