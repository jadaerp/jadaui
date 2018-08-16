


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualCategoryController', CasualCategoryController);

  CasualCategoryController.$inject = ['$scope','$rootScope', '$uibModal','CasualCategoryService','$stateParams', '$state'];
  function CasualCategoryController($scope, $rootScope, $uibModal, CasualCategoryService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

         var SuccessMsg;
         var errorMsg;


         $scope.casualCategoryList=CasualCategoryService.query();



         $scope.loadcasualCategorys = function () {
           $scope.casualCategoryList=CasualCategoryService.query();

         }

         $rootScope.$on("CallLoadcasualCategorys", function(){
           $scope.loadcasualCategorys();
         });





         $scope.delete= function (casualCategory) {
          $scope.CasualCategory=new CasualCategoryService(casualCategory);
          casualCategory.$remove().then(function () {
            $scope.loadcasualCategorys();
          });
        }
        
        $scope.open = function (size) {

          var modalInstance = $uibModal.open({
            templateUrl: 'create.html',
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






        $scope.show = function(casualCategory) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'edit.html',
        controller: ModalInstanceCtrl,
        resolve: {
         casualCategory: function () {
           return casualCategory;
         }
       }        
        // scope : $scope
      });
    };




    


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenCostInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualCategoryService'];
          function ModalOpenCostInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualCategoryService) {
            
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            
            
            $scope.submit=function(CasualCategoryData) {
              $scope.CasualCategory=new CasualCategoryService(CasualCategoryData);
             $scope.CasualCategory.$save().then(function(data){
               var response=angular.fromJson(data);
               
               if(response.Status=="1"){
                 $scope.errorMsg=false;
                 $scope.SuccessMsg =response.Message;
               }else{
                 
                $scope.SuccessMsg=false;
                $scope.errorMsg=response.Message;
              // vm.auth=true;
            }
            $rootScope.$emit("CallLoadcasualCategorys", {});
            $scope.CasualCategoryreset(CasualCategory);

          },


          function() {
           $scope.SuccessMsg=false;
           $scope.errorMsg = 'Server Request Error';
         });

             
           }

           $scope.CasualCategoryreset = function(CasualCategory){
             $scope.CasualCategory={};
             $scope.CasualCategory = " ";
             CasualCategory.$setPristine();
           };

           

            $scope.submitAndClose=function(CasualCategoryData) {
              $scope.CasualCategory=new CasualCategoryService(CasualCategoryData);
             $scope.CasualCategory.$save().then(function(data){
               var response=angular.fromJson(data);
               
               if(response.Status=="1"){
                 $scope.errorMsg=false;
                 $scope.SuccessMsg =response.Message;
                  $uibModalInstance.close('closed');
               }else{
                 
                $scope.SuccessMsg=false;
                $scope.errorMsg=response.Message;
              // vm.auth=true;
            }
            $rootScope.$emit("CallLoadcasualCategorys", {});
            $scope.CasualCategoryreset(CasualCategory);

          },


          function() {
           $scope.SuccessMsg=false;
           $scope.errorMsg = 'Server Request Error';
         });

             
           }           
         }

         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualCategoryService','casualCategory'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualCategoryService,casualCategory) {
          $scope.casualCategoryModel=casualCategory;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.updateCasualCategory=function(casualCategoryModel){
           $scope.CasualCategory=new CasualCategoryService(casualCategoryModel);
           casualCategory.$update().then(function(){
             $rootScope.$emit("CallLoadcasualCategorys", {});
             $scope.casualCategory=casualCategory;
           });
         };

       }
     }
   }

 })();
