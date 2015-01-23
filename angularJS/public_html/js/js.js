/* 
 * Aarón Rosas - aarr90@gmail.com
 */

function CajaController($scope)
{
    $scope.caja = [
        {id: 1, cantidad: 2},
        {id: 32, cantidad: 1},
        {id: 34, cantidad: 3, descuento: 10},
        {id: 12, cantidad: 2}
    ];

    $scope.save = function()
    {
        var id = Math.round(Math.random() * 100);
        var u = Math.round(Math.random() * 10);
        var newItem = {id: id, cantidad: u};
        addItem(newItem);

    };

    function addItem(newItem)
    {
        if (newItem.cantidad > 0)
            $scope.caja.push(newItem);
        else alert("ERROR: 0 unidades");
    }

    $scope.mas1Visibility = false;
    $scope.mas1Visi = function()
    {
        $scope.mas1Visibility = !$scope.mas1Visibility;
    };
}