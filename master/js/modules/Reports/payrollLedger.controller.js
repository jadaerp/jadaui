(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('PayrollLedgerController', PayrollLedgerController);

    PayrollLedgerController.$inject = ['$scope','$http', '$rootScope','$uibModal','PayrollLedgerService','$stateParams', '$state','jadaApiUrl'];
    function PayrollLedgerController($scope,$http,$rootScope, $uibModal, PayrollLedgerService,$stateParams, $state,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

 var SuccessMsg;
 var errorMsg;

  $scope.payrollLedgers=PayrollLedgerService.query();

  console.log($scope.payrollLedgers);
    $scope.loadpayrollLedgers = function () {
          $scope.payrollLedgers=PayrollLedgerService.query();
     }

   $rootScope.$on("CallLoadpayrollLedgers", function(){
              $scope.loadpayrollLedgers();
          });


  $http.get(jadaApiUrl+'api/costcenter').success(function(data) {
                $scope.centers = data;

              });

  $http.get(jadaApiUrl+'api/department').success(function(data) {
                $scope.departments = data;

              });



    $scope.delete= function (gl) {
     gl.$remove().then(function () {
       $scope.loadpayrollLedgers();

  });
  }
            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'newgpayrollLedger.html',
                controller: ModalOpenBankInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };




    $scope.show = function(pledger) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'editgpayrollLedger.html',
          controller: ModalInstanceCtrl,
          resolve: {
             pledger: function () {
               return pledger;
             }
           }        
          // scope : $scope
        });
      };

      



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenBankInstanceCtrl.$inject = ['$scope', '$uibModalInstance','PayrollLedgerService'];
            function ModalOpenBankInstanceCtrl($scope, $uibModalInstance, PayrollLedgerService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.pl=new PayrollLedgerService();
               $scope.submitPayrollLedger=function() {
            $scope.pl.$save().then(function(data){
                      var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
             

          
                 $rootScope.$emit("CallLoadpayrollLedgers", {});
                
            },
              function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
            };


                $scope.submitClosesubmitPayrollLedger=function(pl) {
           pl.$save().then(function(data){
                      var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
             

          
                 $rootScope.$emit("CallLoadpayrollLedgers", {});
                  $scope.ok();
            
            },
              function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
            };
           
           
            }


             ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance','PayrollLedgerService','pledger'];
            function ModalInstanceCtrl($scope, $uibModalInstance, PayrollLedgerService,pledger) {
          var id=pledger.id;


            $scope.pl=PayrollLedgerService.get({id:id});
        
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };


              $scope.updatePayrollLedge=function(pl){
    
              
              pl.$update().then(function(data){

           var response=angular.fromJson(data);
       
            if(response.Status=="1"){
                     $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
                    // $scope.pl=PayrollLedgerService.get({id:id});
            }else{
           
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
          
            }
         
                     $rootScope.$emit("CallLoadpayrollLedgers", {});
              },
              function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
            

              };

           
            }

          

        }
    }
})();