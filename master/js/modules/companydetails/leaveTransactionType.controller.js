

  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('LeaveTransactionTypeController', LeaveTransactionTypeController);

     LeaveTransactionTypeController.$inject = ['$scope','$rootScope', '$uibModal','leaveTTypeService','$stateParams', '$state'];
      function LeaveTransactionTypeController($scope, $rootScope, $uibModal, leaveTTypeService,$stateParams, $state) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;


  $scope.types=leaveTTypeService.query();
  console.log($scope.types);



     $scope.loadLeaveTTypes  = function () {
         $scope.types=leaveTTypeService.query();

     }

   $rootScope.$on("CallLoadLeaveTTypes", function(){
             $scope.loadLeaveTTypes();
          });





    $scope.delete= function (type) {
  type.$remove().then(function () {
      $scope.loadLeaveTTypes();
  });
  }
            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'AddTType.html',
                controller: ModalOpenTTypeInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };






  $scope.show = function(transaction) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'editTType.html',
          controller: ModalInstanceCtrl,
          resolve: {
             transaction: function () {
               return transaction;
             }
           }        
          // scope : $scope
        });
      };




   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenTTypeInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','leaveTTypeService'];
            function ModalOpenTTypeInstanceCtrl($scope, $rootScope,$uibModalInstance, leaveTTypeService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
                 $scope.type=new leaveTTypeService();
             $scope.submitLeaveTType=function(leavetransform) {
             $scope.type.$save().then(function(data){

              var response=angular.fromJson(data);
              console.log(response.Message);
              // $scope.authMsg=response.Message;
              if(response.Status=="1"){
                       $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                    $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
            
              }
               $rootScope.$emit("CallLoadLeaveTTypes", {});
               $scope.leaveTransactionReset(leavetransform);

             },
             function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
      
            }


        
            $scope.leaveTransactionReset=function(leavetransform){
               $scope.leavetransform={};
              $scope.type="";
              leavetransform.$setPristine();
              };

               $scope.closeLeaveTType=function(type) {
                var leavetranType= new  leaveTTypeService(type);
             leavetranType.$save().then(function(){
               $rootScope.$emit("CallLoadLeaveTTypes", {});
                 $scope.ok ();

             },
             function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
      
            }
          }

               ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','leaveTTypeService','transaction'];
            function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, leaveTTypeService,transaction) {

               var id=transaction.id;
              $scope.type=leaveTTypeService.get({id:id});
            // $scope.type=transaction;
            console.log(id);
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
                

                 $scope.updateLeaveTType=function(type){
   
                 type.$update().then(function(){
                     $rootScope.$emit("CallLoadLeaveTTypes", {});
                       });
                  };

            }
          }
      }

  })();
