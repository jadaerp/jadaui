  (function() {
      'use strict';

      angular
          .module('app.useradministration')
          .controller('UserRightsController', UserRightsController);

      UserRightsController.$inject = ['$scope','$rootScope', '$http', '$stateParams', '$state', '$uibModal', '$log', 'userRightsService'];
          function UserRightsController($scope, $rootScope, $http, $stateParams, $state, $uibModal, $log, userRightsService) {
          var vm = this;

          activate();

          ////////////////

          function activate() {
             var SuccessMsg;
              var errorMsg;


   $scope.rights=userRightsService.query();


   $scope.loadUserRights = function () {
       
   $scope.rights=userRightsService.query();
     }

   $rootScope.$on("CallLoadUserRights", function(){
             $scope.loadUserRights();
          });


    $scope.delete= function (right) {
  right.$remove().then(function () {
  $scope.loadUserRights();
  });
  }




     $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'newUserRight.html',
                controller: ModalOpenUserGroupInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };





      


   $scope.show = function(right) {

        var modalInstance = $uibModal.open({
          templateUrl: 'EditUserRight.html',
          controller: ModalInstanceCtrl,
          resolve: {
             right: function () {
               return right;
             }
           }        

        });
      };




             

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenUserGroupInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','userRightsService'];
            function ModalOpenUserGroupInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, userRightsService) {
     

              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };


                $scope.right=new userRightsService();
               $scope.submitUserRight=function() {
            $scope.right.$save().then(function(data){
                var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
             
                  $rootScope.$emit("CallLoadUserRights", {});
            },

             function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };


               $scope.submitUserRightClose=function() {
            $scope.right.$save().then(function(){
              
                  $rootScope.$emit("CallLoadUserRights", {});
                  $scope.ok();
            },
            
             function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
          
            };
            
           
            }


    ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','userRightsService','right'];
            function ModalInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, userRightsService,right) {
              $scope.currentgroup=right;


              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            
           


                  $scope.updateUserRight=function(right){
               currentgroup.$update().then(function(){
                   $rootScope.$emit("CallLoadUserRights", {});
              });
            
                };
            }
          }
      }

  })();