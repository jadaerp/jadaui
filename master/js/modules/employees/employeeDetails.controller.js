
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('EmployeesDetailsController', EmployeesDetailsController);

  EmployeesDetailsController.$inject = ['$stateParams', '$state','$http','$scope', '$uibModal','EmployeeService'];
      function EmployeesDetailsController($stateParams, $state,$http,$scope, $uibModal, EmployeeService) {
        
          var vm = this;

          activate();


          function activate() {

   
             var empid=$stateParams.Employee;
              if(empid!=null){
             $scope.currentemployee=EmployeeService.get({id:empid});
            }
             
           

          }
      }

  })();
