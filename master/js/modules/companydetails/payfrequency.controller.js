
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('PayFrequencyController', PayFrequencyController);

      PayFrequencyController.$inject = ['$scope', '$rootScope','$uibModal','PayFrequencyService','$stateParams', '$state'];
      function PayFrequencyController($scope, $rootScope, $uibModal, PayFrequencyService,$stateParams, $state) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;

  $scope.frequencies=PayFrequencyService.query();




   $scope.loadPayfrequencies = function () {
       $scope.frequencies=PayFrequencyService.query();
     }

   $rootScope.$on("CallLoadPayfrequencies", function(){
             $scope.loadPayfrequencies();
          });

            

    $scope.delete= function (point) {
  point.$remove().then(function () {
    $scope.loadPayfrequencies();
  // $scope.plist.splice($scope.plist.indexOf(code), 1);
  });
  }
            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'AddPayFrequency.html',
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






    $scope.show = function(frequency) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'EditPayFrequency.html',
          controller: ModalInstanceCtrl,
          resolve: {
             frequency: function () {
               return frequency;
             }
           }        
          // scope : $scope
        });
      };


   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','PayFrequencyService'];
            function ModalOpenInstanceCtrl($scope, $rootScope,$uibModalInstance, PayFrequencyService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
          
             $scope.pfrequency=new PayFrequencyService();
               $scope.submitPFrequency=function(payfrequencyform) {
              
              $scope.pfrequency.$save().then(function(data){
                 var response=angular.fromJson(data);
              console.log(response.Message);
         
              if(response.Status=="1"){
                     $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                     $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
          
              }
                      $rootScope.$emit("CallLoadPayfrequencies", {});
                      $scope.pfrequencyReset(payfrequencyform);
              }, 
               function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });

            };



            $scope.pfrequencyReset=function(payfrequencyform){
               $scope.payfrequencyform={};
              $scope.pfrequency="";
              payfrequencyform.$setPristine();
              };

             $scope.closePFrequency=function() {
              
              $scope.pfrequency.$save().then(function(){
                      $rootScope.$emit("CallLoadPayfrequencies", {});
                        $scope.ok();
              },  function() {
                    $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });

            };
           
            }



            ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','PayFrequencyService','frequency'];
            function ModalInstanceCtrl($scope,$rootScope, $uibModalInstance, PayFrequencyService,frequency) {
            $scope.frequency=frequency;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
          
     


        $scope.updatePayFrequency=function(frequency){
               frequency.$update().then(function(){
                     $rootScope.$emit("CallLoadPayfrequencies", {});
              });
            
                };




        

        
           
            }
          }
      }

  })();
