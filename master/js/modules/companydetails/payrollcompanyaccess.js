
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('CompanyPayrollAccess', CompanyPayrollAccess);

  CompanyPayrollAccess.$inject = ['$scope', '$uibModal','$stateParams', '$state','$localStorage'];
    function CompanyPayrollAccess($scope, $uibModal, $stateParams, $state,$localStorage) {
        var vm = this;

        activate();

        ////////////////

        function activate() {



// console.log($localStorage.currentUser.accountRights);
var accountRights=$localStorage.currentUser.accountRights;
for(var r=0;r<accountRights.length;r++){
  // console.log("array "+r+" : ");
  // console.log(accountRights[r]);
  if(accountRights[r].module=="department"){
    // console.log("department");
    $scope.showDepartment=accountRights[r].access;
    $scope.createDepartment=accountRights[r].create;
    $scope.editDepartment=accountRights[r].update;
     $scope.readDepartments=accountRights[r].read;
    $scope.deleteDepartment=accountRights[r].delete;

    break;

  }
}







          
         




    



 


       
        }
    }

})();
