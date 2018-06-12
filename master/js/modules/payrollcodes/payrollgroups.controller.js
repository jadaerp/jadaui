


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('PayrollGroupController', PayrollGroupController);

   PayrollGroupController.$inject = ['$scope','$rootScope', '$uibModal','PayrollGroupService','$stateParams', '$state'];
    function PayrollGroupController($scope, $rootScope,$uibModal, PayrollGroupService,$stateParams, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

 var SuccessMsg;
 var errorMsg;
$scope.groups=PayrollGroupService.query();


 $scope.loadPayrollGroups = function () {
    $http.get(jadaApiUrl+'api/payrollcodegroup').success(function(data) {
                $scope.groups = data;
              });
        // $scope.groups=PayrollGroupService.query();
   }

 $rootScope.$on("CallLoadPayrollGroups", function(){
           $scope.loadPayrollGroups();
        });


  
  $scope.delete= function (group) {
group.$remove().then(function () {
   $scope.loadPayrollGroups();
});
}
          
          $scope.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'AddPgroups.html',
              controller: ModalOpenGroupInstanceCtrl,
              size: size
            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };





 $scope.show = function(codegroup) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'EditPgroups.html',
        controller: ModalInstanceCtrl,
        resolve: {
           codegroup: function () {
             return codegroup;
           }
         }        
        // scope : $scope
      });
    };





 


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenGroupInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PayrollGroupService'];
          function ModalOpenGroupInstanceCtrl($scope, $rootScope,$uibModalInstance, PayrollGroupService) {
          
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            


           $scope.pgroup=new PayrollGroupService();
             $scope.submitPayrollGroup=function(payrollgroupform) {
            
            $scope.pgroup.$save().then(function(data){
                 var response=angular.fromJson(data);
          
            if(response.Status=="1"){
              $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
           
               $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
           
            }
               $rootScope.$emit("CallLoadPayrollGroups", {});
                  $scope.pgroupReset(payrollgroupform);
            },
            function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
          };


            $scope.pgroupReset=function(payrollgroupform){
             $scope.payrollgroupform={};
            $scope.pgroup="";
            payrollgroupform.$setPristine();
            };

           $scope.ClosePayrollGroup=function(pgroup) {
            var savepgroup=new PayrollGroupService(pgroup);
            
            savepgroup.$save().then(function(){
                $rootScope.$emit("CallLoadPayrollGroups", {});
                $scope.ok();
            },
                function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
          };
         
         
          }



          ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PayrollGroupService','codegroup'];
          function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, PayrollGroupService,codegroup) {
          $scope.group=codegroup;
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            

             $scope.updatePayrollGroup=function(group){
             group.$update().then(function(){
                   $rootScope.$emit("CallLoadPayrollGroups", {});
            });
          
              };


           
          }
        }
    }

})();
