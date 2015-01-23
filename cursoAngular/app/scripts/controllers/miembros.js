'use strict';

Date.prototype.a2_toString = function()
{
    return this.getDate() + "/" + this.getMonth() + 1 + "/" + this.getFullYear();
};

/**
 * @ngdoc function
 * @name cursoAngularApp.controller:MiembrosCtrl
 * @description
 * # MiembrosCtrl
 * Controller of the cursoAngularApp
 */
angular.module('cursoAngularApp').controller('MiembrosCtrl', function($scope, $http, $modal) {
    $http.get('http://localhost:9000/miembros.json').success(function(data)
    {
        $scope.miembros = data;
    });
    $scope.gridOptions = {
        data: 'miembros',
        showGroupPanel: true,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        columnDefs: [
            {field: 'no', displayName: 'Nº.'},
            {field: 'nombre', displayName: 'Nombre'},
            {field: 'fidelidad', displayName: 'Fidelidad'},
            {field: 'fechaUnion', displayName: 'Fecha de Unión'},
            {field: 'tipoMiembro', displayName: 'Tipo de Miembro'}
        ]
    };

    /* abrir el modal y recoger los datos del miembro para guardarlos */
    $scope.showModal = function()
    {

        var modalInstance = $modal.open({
            templateUrl: 'views/addMiembros.html',
            controller: 'AddNuevoMiembroCtrl'
        });

        modalInstance.result.then(function(item)
        {
            item["no"] = $scope.miembros.length + 1;
            item["fechaUnion"] = item.fechaUnion.a2_toString();
            $scope.miembros.push(item);
        });
    };

}).controller('AddNuevoMiembroCtrl', function($scope, $modalInstance) {

    /* datos por defecto */
    $scope.nuevoMiembro = {
        nombre: '',
        tipoMiembro: 'Free',
        fidelidad: 5,
        fechaUnion: new Date()
    };

    $scope.salvarNuevoMiembro = function()
    {
        $modalInstance.close($scope.nuevoMiembro);
    };

    $scope.cancel = function()
    {
        $modalInstance.dismiss('cancel');
    };

});
