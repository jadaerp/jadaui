

      /**=========================================================
       * Module: modals.js
       * Provides a simple way to implement bootstrap modals from templates
       =========================================================*/
      (function() {
          'use strict';

          angular
              .module('app.bootstrapui')
              .controller('LeaveController', LeaveController);

         LeaveController.$inject = ['$scope','$rootScope', '$uibModal','leaveService','$stateParams', '$state'];
          function LeaveController($scope, $rootScope, $uibModal, leaveService,$stateParams, $state) {
              var vm = this;

              activate();

              ////////////////

              function activate() {

       var SuccessMsg;
       var errorMsg;

      $scope.leaves=leaveService.query();


      console.log($scope.leaves);
         $scope.loadLeaveTypes = function () {
             $scope.leaves=leaveService.query();

         }

       $rootScope.$on("CallLoadLeaveTypes", function(){
                 $scope.loadLeaveTypes();
              });





        $scope.delete= function (leavetype) {
      leavetype.$remove().then(function () {
          $scope.loadLeaveTypes();
      });
      }
                
                $scope.open = function (size) {

                  var modalInstance = $uibModal.open({
                    templateUrl: 'addLeave.html',
                    controller: ModalOpenLeaveInstanceCtrl,
                    size: size
                  });





                  var state = $('#modal-state');
                  modalInstance.result.then(function () {
                    state.text('Modal dismissed with OK status');
                  }, function () {
                    state.text('Modal dismissed with Cancel status');
                  });
                };






      $scope.show = function(leaveType) {
            // $scope.x = x;
            var modalInstance = $uibModal.open({
              templateUrl: 'editLeave.html',
              controller: ModalInstanceCtrl,
              resolve: {
                 leaveType: function () {
                   return leaveType;
                 }
               }        
              // scope : $scope
            });
          };




       


                // Please note that $uibModalInstance represents a modal window (instance) dependency.
                // It is not the same as the $uibModal service used above.

                ModalOpenLeaveInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','leaveService'];
                function ModalOpenLeaveInstanceCtrl($scope, $rootScope,$uibModalInstance, leaveService) {
                
                  $scope.ok = function () {
                    $uibModalInstance.close('closed');
                  };

                  $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                  };
                  
                     $scope.leave=new leaveService();
                 $scope.submitLeaveTypes=function(paypointform) {
                 $scope.leave.$save().then(function(data){

                   var response=angular.fromJson(data);
                  console.log($scope.leave);
                  // $scope.authMsg=response.Message;
                  if(response.Status=="1"){
                           $scope.errorMsg=false;
                          $scope.SuccessMsg =response.Message;
                  }else{
                 
                        $scope.SuccessMsg=false;
                         $scope.errorMsg=response.Message;
                
                  }
                   $rootScope.$emit("CallLoadLeaveTypes", {});
                    $scope.leavetypeReset();

                 },
                 function() {
                      $scope.SuccessMsg=false;
                       $scope.errorMsg = 'Server Request Error';
                      });
          
                }

                 $scope.leavetypeReset=function(paypointform){
                   $scope.paypointform={};
                  $scope.leave="";
                  paypointform.$setPristine();
                  };
                   $scope.closesubmitLeaveTypes=function(leave) {
                    var saveleave=new leaveService(leave);
                 saveleave.$save().then(function(){
                   $rootScope.$emit("CallLoadLeaveTypes", {});
                     $scope.ok();

                 },
                  function() {
                      $scope.SuccessMsg=false;
                       $scope.errorMsg = 'Server Request Error';
                      });
          
                }

              }

                   ModalInstanceCtrl.$inject = ['$scope','$http', '$rootScope','$uibModalInstance','leaveService','leaveType','jadaApiUrl','$resource'];
                function ModalInstanceCtrl($scope, $http,$rootScope,$uibModalInstance,leaveService,leaveType,jadaApiUrl,$resource) {
       var id=leaveType.id;
                $scope.leave=leaveService.get({id:id});
              
         

                  

                  $scope.ok = function () {
                    $uibModalInstance.close('closed');
                  };

                  $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                  };
                  
                  

                     $scope.UpdateLeaveTypes=function(leave){
              

                 leave.$update().then(function(data){
                           var response=angular.fromJson(data);
                  console.log($scope.leave);
                  // $scope.authMsg=response.Message;
                  if(response.Status=="1"){
                           $scope.errorMsg=false;
                          $scope.SuccessMsg =response.Message;
                           $scope.leave=leaveService.get({id:id});
                  }else{
                 
                        $scope.SuccessMsg=false;
                         $scope.errorMsg=response.Message;
                
                  }
                   $rootScope.$emit("CallLoadLeaveTypes", {});
                  }, function() {
                      $scope.SuccessMsg=false;
                       $scope.errorMsg = 'Server Request Error';
                      });

                      };

                }
              }
          }

      })();
