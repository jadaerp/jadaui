


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualApprovalController', CasualApprovalController);

  CasualApprovalController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','CasualApprovalService','$stateParams', '$state'];
  function CasualApprovalController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, CasualApprovalService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

          $scope.CasualApprovalModel={};
         $scope.CasualApprovalModel.clockIn = new Date();          
         $scope.CasualApprovalModel.clockOut = new Date(); 
         $scope.CasualApprovalModel.date = new Date(); 
         var SuccessMsg;
         var errorMsg;


         $scope.CasualApprovalList=CasualApprovalService.query();

       $http.get(jadaApiUrl+'api/casuals/').success(function(data) {
                 $scope.casualList = data;
           

              });

       $http.get(jadaApiUrl+'api/casualcategory/').success(function(data) {
                 $scope.casualCategoryList = data;
           

              });       

         $scope.loadCasualApprovals = function () {
           $scope.CasualApprovalList=CasualApprovalService.query();

         }

         $rootScope.$on("CallLoadCasualApprovals", function(){
           $scope.loadCasualApprovals();
         });





         $scope.delete= function (CasualApproval) {
          $scope.CasualApproval=new CasualApprovalService(CasualApproval);
          CasualApproval.$remove().then(function () {
            $scope.loadCasualApprovals();
          });
        }

        $scope.getHoursDone=function (CasualApprovalModel){
          
          var startDate = new Date(CasualApprovalModel.clockIn);
          // Do your operations
          var endDate   = new Date(CasualApprovalModel.clockOut);
          var hoursDone = (endDate.getTime() - startDate.getTime())/1000/3600;  
          CasualApprovalModel.hoursDone=hoursDone;
              if(CasualApprovalModel.casualCategoryId==null || CasualApprovalModel.casualCategoryId==""){
                alert("Casual Category not selected");
                return;
              } 
              if(CasualApprovalModel.hoursDone==null || CasualApprovalModel.hoursDone<=0 ){
                alert("Hours Done must be greater than zero");
                return;
              }                 
       $http.get(jadaApiUrl+'api/casualcategory/'+CasualApprovalModel.casualCategoryId).success(function(data) {
                 var casualCategory=data;
                 CasualApprovalModel.amountDue=casualCategory.rate*CasualApprovalModel.hoursDone;
                 
           

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






        $scope.show = function(CasualApproval) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'casual-approval-modal.html',
        controller: ModalInstanceCtrl,
        resolve: {
         CasualApproval: function () {
           return CasualApproval;
         }
       }        
        // scope : $scope
      });
    };




    


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.
         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualApprovalService','CasualApproval'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualApprovalService,CasualApproval) {
          $scope.CasualApprovalModel=CasualApproval;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.approveCasual=function(CasualApprovalModel){
           
          CasualApprovalModel.$update().then(function(){
             $rootScope.$emit("CallLoadCasualApprovals", {});
             $scope.CasualApprovalModel=CasualApprovalModel;
           });
         };

       }
     }
   }

 })();
