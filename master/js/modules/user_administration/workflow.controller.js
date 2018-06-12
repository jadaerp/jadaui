  (function() {
      'use strict';

      angular
          .module('app.useradministration')
          .controller('WorkflowController', WorkflowController);

      WorkflowController.$inject = ['$scope','$rootScope', '$http', '$stateParams', '$state', '$uibModal', '$log', 'WorkflowService','jadaApiUrl'];
          function WorkflowController($scope, $rootScope, $http, $stateParams, $state, $uibModal, $log, WorkflowService,jadaApiUrl) {
          var vm = this;

          activate();

          ////////////////

          function activate() {
   var SuccessMsg;
   var errorMsg;

   $scope.workflows=WorkflowService.query();


   
   $http.get(jadaApiUrl+'api/user').success(function(data) {
                $scope.users = data;

              });
      

   $scope.loadWorkflows = function () {
       $scope.workflows=WorkflowService.query();
     }


   $rootScope.$on("CallLoadWorkflows", function(){
             $scope.loadWorkflows();
          });



    $scope.delete= function (workflow) {
  workflow.$remove().then(function () {
  $scope.loadWorkflows();
  });
  }


        $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'newWorkflow.html',
                controller: ModalOpenWorkflowInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };





      


           $scope.show = function(workflow) {

                var modalInstance = $uibModal.open({
                  templateUrl: 'Editworkflow.html',
                  controller: ModalInstanceCtrl,
                  resolve: {
                     workflow: function () {
                       return workflow;
                     }
                   }        

                });
              };




             

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenWorkflowInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','WorkflowService'];
            function ModalOpenWorkflowInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, WorkflowService) {
  

              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };


                $scope.workflow=new WorkflowService();
               $scope.submitWorkflow=function(workflowform) {
            $scope.workflow.$save().then(function(data){
              var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
             
                  $rootScope.$emit("CallLoadWorkflows", {});
                  $scope.workflowReset(workflowform);
            },function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };
            
             $scope.workflowReset=function(workflowform){
               $scope.workflowform={};
              $scope.workflow="";
              workflowform.$setPristine();
              };

              $scope.closeWorkflow=function() {
            $scope.workflow.$save().then(function(){
             
                  $rootScope.$emit("CallLoadWorkflows", {});
                  $scope.ok();
            },function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };
           
            }


    ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','WorkflowService','workflow'];
            function ModalInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, WorkflowService,workflow) {
              $scope.currentworkflow=workflow;
    

              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            
           


                  $scope.updateWorkflow=function(workflow){
               workflow.$update().then(function(){
                   $rootScope.$emit("CallLoadWorkflows", {});
              });
            
                };
            }
          }
      }

  })();