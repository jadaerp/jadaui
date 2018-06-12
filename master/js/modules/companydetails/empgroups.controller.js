

  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('EmpGroupController', EmpGroupController);

      EmpGroupController.$inject = ['$scope', '$rootScope', '$uibModal','EmpGroupService','$stateParams', '$state'];
      function EmpGroupController($scope, $rootScope,$uibModal, EmpGroupService,$stateParams, $state) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;

             $scope.groups=EmpGroupService.query();





    $scope.loadEmployeeGroups = function () {
          $scope.groups=EmpGroupService.query();
     }

   $rootScope.$on("CallLoadEmployeeGroups", function(){
             $scope.loadEmployeeGroups();
          });


               $scope.delete= function (group) {
              group.$remove().then(function () {
           $scope.loadEmployeeGroups();
              });
              }

            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'newGroup.html',
                controller: ModalOpnenGroupInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };







    $scope.showgroup = function(employeegroup) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'editGroup.html',
          controller: ModalInstanceCtrl,
          resolve: {
             employeegroup: function () {
               return employeegroup;
             }
           }        
          // scope : $scope
        });
      };

   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpnenGroupInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','EmpGroupService'];
            function ModalOpnenGroupInstanceCtrl($scope, $rootScope,$uibModalInstance, EmpGroupService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };


              $scope.groupone=new EmpGroupService();
               $scope.submitGroup=function(groupform) {
      
             $scope.groupone.$save().then(function(data){
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
             $rootScope.$emit("CallLoadEmployeeGroups", {});
              $scope.groupReset(groupform);

             }, function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };


            $scope.groupReset=function(groupform){
               $scope.groupform={};
              $scope.groupone="";
              groupform.$setPristine();
              };

              $scope.closeGroup=function() {
      
             $scope.groupone.$save().then(function(){
             $rootScope.$emit("CallLoadEmployeeGroups", {});
             $scope.ok();

             }, function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };


          
            }



             ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','EmpGroupService','employeegroup'];
            function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, EmpGroupService,employeegroup) {
            $scope.group=employeegroup;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };

                 $scope.updategroup=function(group){
               group.$update().then(function(){
                     $rootScope.$emit("CallLoadEmployeeGroups", {});
              });
            
                };


          
     


          
            }
          }
      }

  })();

