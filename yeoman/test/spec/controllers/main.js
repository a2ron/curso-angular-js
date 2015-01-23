'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));


  it('debe añadir y luego eliminar un item de la lista',function()
  {
     scope.tarea = 'Test 1';
     var num = scope.tareas.length;
     scope.addTarea();
     scope.eliminarTarea(0);
     expect(scope.tareas.length).toBe(num);
  });
  
});
