
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('PayModeController', PayModeController);

      PayModeController.$inject = ['$scope','$rootScope', '$uibModal','PayModeService','$stateParams', '$state'];
      function PayModeController($scope,$rootScope, $uibModal, PayModeService,$stateParams, $state) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;

  $scope.paymodes=PayModeService.query();



     $scope.loadPaymodes = function () {
          $scope.paymodes=PayModeService.query();
     }

   $rootScope.$on("CallLoadPaymodes", function(){
             $scope.loadPaymodes();
          });

     
            

    $scope.delete= function (paymode) {
  paymode.$remove().then(function () {
    $scope.loadPaymodes();
  // $scope.plist.splice($scope.plist.indexOf(code), 1);
  });
  }


            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'addPayMode.html',
                controller: ModalOpenInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };




    $scope.show = function(paymode) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'editPayMode.html',
          controller: ModalInstanceCtrl,
          resolve: {
             paymode: function () {
               return paymode;
             }
           }        
          // scope : $scope
        });
      };

      



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PayModeService'];
            function ModalOpenInstanceCtrl($scope,$rootScope, $uibModalInstance, PayModeService) {
      

              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.paymode=new PayModeService();
              
               $scope.submitPayMode=function(paymodeform) {
             $scope.paymode.$save().then(function(data){
            var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                      $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                   $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
            $rootScope.$emit("CallLoadPaymodes", {});
           $scope.paymodeReset(paymodeform);
           },
            function() {
                $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
   
            };


     
            $scope.paymodeReset=function(paymodeform){

               $scope.paymodeform={};
              $scope.paymode="";
              paymodeform.$setPristine();
              };

             $scope.ClosePayMode=function(paymode) {
                  var savepaymode=new PayModeService(paymode);
           savepaymode.$save().then(function(data){
           
            $rootScope.$emit("CallLoadPaymodes", {});
            $scope.ok();
           },
            function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
   
            };
           
            }

            ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PayModeService','paymode'];
            function ModalInstanceCtrl($scope,$rootScope, $uibModalInstance, PayModeService,paymode) {
              $scope.paymode=paymode;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
                  $scope.updatePayMode=function(paymode){

                
               paymode.$update().then(function(){
                     
                     $rootScope.$emit("CallLoadPaymodes", {});
              });
            
                };

           
            }
          }
      }

  })();
