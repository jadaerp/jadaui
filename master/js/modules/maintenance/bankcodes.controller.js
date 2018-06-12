
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('BankCodeController', BankCodeController);

      BankCodeController.$inject = ['$scope', '$rootScope','$uibModal','bankcodeService','$stateParams', '$state','DTOptionsBuilder', 'DTColumnDefBuilder'];
      function BankCodeController($scope,$rootScope, $uibModal, bankcodeService,$stateParams, $state,DTOptionsBuilder, DTColumnDefBuilder) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

         var SuccessMsg;
         var errorMsg;

        $scope.banks=bankcodeService.query();
          $scope.loadBanks = function () {
                $scope.banks=bankcodeService.query();
           }

         $rootScope.$on("CallLoadBanks", function(){
                   $scope.loadBanks();
                });


           $scope.delete= function (bank) {
                 bank.$remove().then(function () {
                 $scope.loadBanks();

              });
              }
            

            $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'addbankcodes.html',
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




       $scope.show = function(bank) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'editbankcodes.html',
          controller: ModalInstanceCtrl,
          resolve: {
             bank: function () {
               return bank;
             }
           }        
         
        });
      };

      



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenBankInstanceCtrl.$inject = ['$scope', '$uibModalInstance','bankcodeService'];
            function ModalOpenBankInstanceCtrl($scope, $uibModalInstance, bankcodeService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
               
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
             
           
             $scope.submitBankClose=function(bank) {
                   var savebanks=new bankcodeService(bank);
            savebanks.$save().then(function(){

           
                 $rootScope.$emit("CallLoadBanks", {});
                 $scope.ok();
            },
            function() {
                 $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
    
            };

              $scope.bank=new bankcodeService();

              $scope.submitBank=function(bankform) {
            $scope.bank.$save().then(function(data){
                 var response=angular.fromJson(data);
           
              if(response.Status=="1"){
                       $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
                  $scope.SuccessMsg=false;
                  $scope.errorMsg=response.Message;
               
              }
              
               $rootScope.$emit("CallLoadBanks", {});
                $scope.bankReset(bankform);
              
            },
            function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
    
            };
           
            }

             $scope.bankReset=function(bankform){
               $scope.bankform={};
              $scope.bank="";
              bankform.$setPristine();
              };


             ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance','bankcodeService','bank'];
            function ModalInstanceCtrl($scope, $uibModalInstance, bankcodeService,bank) {
            $scope.bank=bank;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };


              $scope.updateBank=function(bank){
             bank.$update().then(function(){
                     $rootScope.$emit("CallLoadBanks", {});
              });
            

              };

           
            }
          }
      }

  })();




