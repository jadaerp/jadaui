  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('CompanyInfoController', CompanyInfoController);

      CompanyInfoController.$inject = ['$scope','$rootScope', '$uibModal','CompanyInfoService','$stateParams', '$state'];
      function CompanyInfoController($scope,$rootScope, $uibModal, CompanyInfoService,$stateParams, $state) {
          var vm = this;

          activate();

          ////////////////

          function activate() {


   var SuccessMsg;
   var errorMsg;

   $scope.company=CompanyInfoService.get({id:28});






    $scope.loadStatutory = function () {
     
   $scope.company=CompanyInfoService.get({id:1});
     }

   $rootScope.$on("CallLoadStatutory", function(){
             $scope.loadStatutory ();
          });


          $scope.delete= function (statutory) {
                    statutory.$remove().then(function () {
                    $scope.loadStatutory();
              });
              }
            
           $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'CompInfoContent.html',
                controller: ModalOpenStatutoryInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };





    $scope.show = function(statutory) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'CompInfoedit.html',
          controller: ModalInstanceCtrl,
          resolve: {
             statutory: function () {
               return statutory;
             }
           }        
          // scope : $scope
        });
      };
      
   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenStatutoryInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','CompanyInfoService'];
            function ModalOpenStatutoryInstanceCtrl($scope, $rootScope,$uibModalInstance, CompanyInfoService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.statutory=new CompanyInfoService();
               $scope.submitStatutory=function() {
            $scope.statutory.$save().then(function(data){
              var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                   $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                     $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
               $rootScope.$emit("CallLoadStatutory", {});
            

            },
               function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };
           
            }


            $scope.resetstatutory = function(statutory){
               $scope.statutoryform={};
              $scope.statutory = " ";
              statutory.$setPristine();
              };


            ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','CompanyInfoService','statutory'];
            function ModalInstanceCtrl($scope,$rootScope, $uibModalInstance, CompanyInfoService,statutory) {
              $scope.company=statutory;
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
           
               

             $scope.updateStatutory=function(company){
               company.$update().then(function(){
                     $rootScope.$emit("CallLoadStatutory", {});
              });
            
                };
            }
          }
      }

  })();
