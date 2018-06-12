


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CostCenterController', CostCenterController);

  CostCenterController.$inject = ['$scope','$rootScope', '$uibModal','CostCentreService','$stateParams', '$state'];
  function CostCenterController($scope, $rootScope, $uibModal, CostCentreService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

         var SuccessMsg;
         var errorMsg;


         $scope.centres=CostCentreService.query();



         $scope.loadCenters = function () {
           $scope.centres=CostCentreService.query();

         }

         $rootScope.$on("CallLoadCenters", function(){
           $scope.loadCenters();
         });





         $scope.delete= function (center) {
          center.$remove().then(function () {
            $scope.loadCenters();
          });
        }
        
        $scope.open = function (size) {

          var modalInstance = $uibModal.open({
            templateUrl: 'AddCostCenter.html',
            controller: ModalOpenCostInstanceCtrl,
            size: size
          });





          var state = $('#modal-state');
          modalInstance.result.then(function () {
            state.text('Modal dismissed with OK status');
          }, function () {
            state.text('Modal dismissed with Cancel status');
          });
        };






        $scope.show = function(center) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'EditCostCenter.html',
        controller: ModalInstanceCtrl,
        resolve: {
         center: function () {
           return center;
         }
       }        
        // scope : $scope
      });
    };




    


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenCostInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CostCentreService'];
          function ModalOpenCostInstanceCtrl($scope, $rootScope,$uibModalInstance, CostCentreService) {
            
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            
            $scope.costcenter=new CostCentreService();
            $scope.submitCostCentre=function(costcentre) {
             $scope.costcenter.$save().then(function(data){
               var response=angular.fromJson(data);
               
               if(response.Status=="1"){
                 $scope.errorMsg=false;
                 $scope.SuccessMsg =response.Message;
               }else{
                 
                $scope.SuccessMsg=false;
                $scope.errorMsg=response.Message;
              // vm.auth=true;
            }
            $rootScope.$emit("CallLoadCenters", {});
            $scope.costcenterreset(costcentre);

          },


          function() {
           $scope.SuccessMsg=false;
           $scope.errorMsg = 'Server Request Error';
         });

             
           }

           $scope.costcenterreset = function(costcentre){
             $scope.costcentre={};
             $scope.costcenter = " ";
             costcentre.$setPristine();
           };

           $scope.submitCostCentreClose=function() {
             $scope.costcenter.$save().then(function(){
               $rootScope.$emit("CallLoadCenters", {});
               $scope.ok();

             }, function() {
              $scope.SuccessMsg=false;
              $scope.errorMsg = 'Server Request Error';
            });
             
           }
         }

         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CostCentreService','center'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, CostCentreService,center) {
          $scope.center=center;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.updateCostCenter=function(center){
           
           center.$update().then(function(){
             $rootScope.$emit("CallLoadCenters", {});
             $scope.center=center;
           });
         };

       }
     }
   }

 })();
