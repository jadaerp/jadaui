
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('LeaveEntitlementController', LeaveEntitlementController);

      LeaveEntitlementController.$inject = ['$scope', '$http', '$rootScope','$uibModal','LeaveEntitlementService','$stateParams', '$state','jadaApiUrl'];
      function LeaveEntitlementController($scope,$http,$rootScope, $uibModal, LeaveEntitlementService,$stateParams, $state,jadaApiUrl) {
          var vm = this;

          activate();

          ////////////////

          function activate() {
   var SuccessMsg;
   var errorMsg;



  $scope.leaveEntitlementData=LeaveEntitlementService.query();
  console.log($scope.leaveEntitlementData);


   $http.get(jadaApiUrl+'api/employeegroup').success(function(data) {
               $scope.employeeGroupData = data;

            });



   $http.get(jadaApiUrl+'api/leavetype').success(function(data) {
               $scope.leaveTypeData = data;
         

            });

    $scope.loadLeave = function () {
     
  $scope.leaveEntitlementData=LeaveEntitlementService.query();
     }

   $rootScope.$on("CallLoadLeaveLeaveEntitlement", function(){
             $scope.loadLeave ();
          });


               $scope.delete= function (cat) {
              cat.$remove().then(function () {
           $scope.loadLeave ();
              });
              }


   
            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'LeaveEntitlementForm.html',
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






      

  $scope.show = function(category) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'EmpCategoryEdit.html',
          controller: ModalInstanceCtrl,
          resolve: {
             category: function () {
               return category;
             }
           }        
          // scope : $scope
        });
      };



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance','LeaveEntitlementService'];
            function ModalOpenInstanceCtrl($scope, $rootScope, $uibModalInstance, LeaveEntitlementService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };

              $scope.leaveEntitlementData=LeaveEntitlementService.query();
             $scope.category=new LeaveEntitlementService();
               $scope.submitLeaveEntitlement=function(categoryform) {
                
              $scope.category=new LeaveEntitlementService(categoryform);
              $scope.category.$save().then(function(data){
                var response=angular.fromJson(data);
              
              // $scope.authMsg=response.Message;
              if(response.Status=="1"){
                      $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
                       $scope.categoryReset(categoryform);
              }else{
             
                    $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
              $rootScope.$emit("CallLoadLeaveLeaveEntitlement", {});

              }, function() {
                 $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
            
            };

$scope.submitLeaveEntitlementExit=function(categoryform) {
                
              $scope.category=new LeaveEntitlementService(categoryform);
              $scope.category.$save().then(function(data){
                var response=angular.fromJson(data);
              $rootScope.$emit("CallLoadLeaveLeaveEntitlement", {});
              // $scope.authMsg=response.Message;
              if(response.Status=="1"){
                $scope.cancel();
                      $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
                       $scope.categoryReset(categoryform);
              }else{
             
                    $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
              

              }, function() {
                 $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
            
            };

            $scope.categoryReset=function(categoryform){
               $scope.categoryform={};

              
              };

            $scope.EmpCategotyClose=function() {
              
              $scope.category.$save().then(function(){
              $rootScope.$emit("CallLoadLeave", {});
              $scope.ok();

              },
              function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            
            };
           
            }



            ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$uibModalInstance','LeaveEntitlementService','category'];
            function ModalInstanceCtrl($scope, $rootScope, $uibModalInstance, LeaveEntitlementService,category) {
            $scope.cat=category;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
             
             $scope.updateEmpCategory=function(cat){
               cat.$update().then(function(){
                     $rootScope.$emit("CallLoadLeave", {});
              });
            
                };
            }
          }
      }

  })();
