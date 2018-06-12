  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('ExemptionsController', ExemptionsController);

      ExemptionsController.$inject = ['$scope','$http','$rootScope', '$uibModal','ExemptionsService','$stateParams', '$state','jadaApiUrl'];
      function ExemptionsController($scope,$http,$rootScope, $uibModal, ExemptionsService,$stateParams, $state,jadaApiUrl) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;


              $scope.exemptemployees=ExemptionsService.query();

                $http.get(jadaApiUrl+'api/employee').success(function(data) {
                $scope.employees = data;
            
              });


   $scope.loadExemptemployees = function () {
       
   $scope.exemptemployees=ExemptionsService.query();
     }

   $rootScope.$on("CallExemptemployees", function(){
             $scope.loadExemptemployees();
          });


  $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
                 $scope.pcodes = data;
           

              });


  $http.get(jadaApiUrl+'api/employee').success(function(data) {
                $scope.employees = data;
              });





    $scope.delete= function (employee) {
  employee.$remove().then(function () {
   $scope.loadExemptemployees();
  });
  }

           $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'addExempt.html',
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





      


           $scope.show = function(exemptEmployee) {

                var modalInstance = $uibModal.open({
                  templateUrl: 'EditExempt.html',
                  controller: ModalInstanceCtrl,
                  resolve: {
                     exemptEmployee: function () {
                       return exemptEmployee;
                     }
                   }        

                });
              };



     
   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenInstanceCtrl.$inject = ['$scope','$http','$rootScope', '$uibModalInstance','ExemptionsService','jadaApiUrl'];
            function ModalOpenInstanceCtrl($scope, $http,$rootScope,$uibModalInstance, ExemptionsService,jadaApiUrl) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.exempt=new ExemptionsService();
               $scope.submitExempt=function(exemptionform) {
            $scope.exempt.$save().then(function(data){
              var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
             
                  $rootScope.$emit("CallExemptemployees", {});

              $scope.exempReset(exemptionform);
            },
             function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };
            
              $scope.exempReset=function(exemptionform){
               $scope.exemptionform={};
              $scope.exempt="";
              exemptionform.$setPristine();
              };

               $scope.CloseExempt=function() {
            $scope.exempt.$save().then(function(){
             
                  $rootScope.$emit("CallExemptemployees", {});
                    $scope.ok();
            }, function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };







            }



            ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$http','$uibModalInstance','ExemptionsService','exemptEmployee','jadaApiUrl'];
            function ModalInstanceCtrl($scope, $rootScope,$http,$uibModalInstance, ExemptionsService,exemptEmployee,jadaApiUrl) {
            $scope.employee=exemptEmployee;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            

             

              
                  $scope.updateExempt=function(employee){
               employee.$update().then(function(){
                   $rootScope.$emit("CallExemptemployees", {});
              });
            
                };
              


           
            }
          }
      }

  })();
