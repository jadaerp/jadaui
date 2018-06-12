
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('PayPointController', PayPointController);

      PayPointController.$inject = ['$scope','$rootScope', '$uibModal','PaypointService','$stateParams', '$state'];
      function PayPointController($scope,$rootScope, $uibModal, PaypointService,$stateParams, $state) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;

  $scope.points=PaypointService.query();



     $scope.loadPoints = function () {
          $scope.points=PaypointService.query();
     }

   $rootScope.$on("CallParentMethod", function(){
             $scope.loadPoints();
          });

     
            

    $scope.delete= function (point) {
  point.$remove().then(function () {
    $scope.loadPoints();

  });
  }


            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'PayPointContent.html',
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




    $scope.show = function(point) {
      
        var modalInstance = $uibModal.open({
          templateUrl: 'PayPointEdit.html',
          controller: ModalInstanceCtrl,
          resolve: {
             point: function () {
               return point;
             }
           }        
         
        });
      };

      



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PaypointService'];
            function ModalOpenInstanceCtrl($scope,$rootScope, $uibModalInstance, PaypointService) {
      

              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.ppoint=new PaypointService();
              
               $scope.submitPayPoint=function(paypointform) {
             $scope.ppoint.$save().then(function(data){
            var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                      $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                   $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
            $rootScope.$emit("CallParentMethod", {});
             $scope.ppointReset(paypointform);
         
           },
            function() {
                $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
   
            };


        
            $scope.ppointReset=function(leavetypesform){
               $scope.leavetypesform={};
              $scope.ppoint="";
              leavetypesform.$setPristine();
              };


             $scope.ClosePayPoint=function(ppoint) {
              var saveppoint= new PaypointService(ppoint);
           saveppoint.$save().then(function(data){
           
            $rootScope.$emit("CallParentMethod", {});
            $scope.ok();
           },
            function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
   
            };
           
            }

            ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PaypointService','point'];
            function ModalInstanceCtrl($scope,$rootScope, $uibModalInstance, PaypointService,point) {
              $scope.point=point;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
                  $scope.updatePayPoint=function(point){

                
               point.$update().then(function(){
                        $scope.point=point;
                        console.log(point);
                     $rootScope.$emit("CallParentMethod", {});
              });
            
                };

           
            }
          }
      }

  })();
