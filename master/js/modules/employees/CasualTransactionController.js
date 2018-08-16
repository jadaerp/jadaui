


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualTransactionController', CasualTransactionController);

  CasualTransactionController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','CasualTransactionService','$stateParams', '$state'];
  function CasualTransactionController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, CasualTransactionService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

          $scope.CasualTransactionModel={};
         $scope.CasualTransactionModel.clockIn = new Date();          
         $scope.CasualTransactionModel.clockOut = new Date(); 
         $scope.CasualTransactionModel.date = new Date(); 
         var SuccessMsg;
         var errorMsg;


         $scope.CasualTransactionList=CasualTransactionService.query();

       $http.get(jadaApiUrl+'api/casuals/').success(function(data) {
                 $scope.casualList = data;
           

              });

       $http.get(jadaApiUrl+'api/casualcategory/').success(function(data) {
                 $scope.casualCategoryList = data;
           

              });       

         $scope.loadCasualTransactions = function () {
           $scope.CasualTransactionList=CasualTransactionService.query();

         }

         $rootScope.$on("CallLoadCasualTransactions", function(){
           $scope.loadCasualTransactions();
         });





         $scope.delete= function (CasualTransaction) {
          $scope.CasualTransaction=new CasualTransactionService(CasualTransaction);
          CasualTransaction.$remove().then(function () {
            $scope.loadCasualTransactions();
          });
        }

        $scope.getHoursDone=function (CasualTransactionModel){
          
          var startDate = new Date(CasualTransactionModel.clockIn);
          // Do your operations
          var endDate   = new Date(CasualTransactionModel.clockOut);
          var hoursDone = (endDate.getTime() - startDate.getTime())/1000/3600;  
          CasualTransactionModel.hoursDone=hoursDone;
              if(CasualTransactionModel.casualCategoryId==null || CasualTransactionModel.casualCategoryId==""){
                alert("Casual Category not selected");
                return;
              } 
              if(CasualTransactionModel.hoursDone==null || CasualTransactionModel.hoursDone<=0 ){
                alert("Hours Done must be greater than zero");
                return;
              }                 
       $http.get(jadaApiUrl+'api/casualcategory/'+CasualTransactionModel.casualCategoryId).success(function(data) {
                 var casualCategory=data;
                 CasualTransactionModel.amountDue=casualCategory.rate*CasualTransactionModel.hoursDone;
                 
           

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






        $scope.show = function(CasualTransaction) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'edit.html',
        controller: ModalInstanceCtrl,
        resolve: {
         CasualTransaction: function () {
           return CasualTransaction;
         }
       }        
        // scope : $scope
      });
    };




    


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenCostInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualTransactionService'];
          function ModalOpenCostInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualTransactionService) {
            
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            
            
            $scope.submit=function(CasualTransactionModel) {
              if(CasualTransactionModel.casualId==null || CasualTransactionModel.casualId==""){
                alert("Casual not selected");
                return;
              }
              if(CasualTransactionModel.casualCategoryId==null || CasualTransactionModel.casualCategoryId==""){
                alert("Casual Category not selected");
                return;
              }              
              if(CasualTransactionModel.hoursDone==null || CasualTransactionModel.hoursDone<=0 ){
                alert("Hours Done must be greater than zero");
                return;
              }              

              $scope.CasualTransaction=new CasualTransactionService(CasualTransactionModel);
             $scope.CasualTransaction.$save().then(function(data){
               var response=angular.fromJson(data);
               
               if(response.Status=="1"){
                 $scope.errorMsg=false;
                 $scope.SuccessMsg =response.Message;
               }else{
                 
                $scope.SuccessMsg=false;
                $scope.errorMsg=response.Message;
              // vm.auth=true;
            }
            $rootScope.$emit("CallLoadCasualTransactions", {});
            $scope.CasualTransactionreset(CasualTransaction);

          },


          function() {
           $scope.SuccessMsg=false;
           $scope.errorMsg = 'Server Request Error';
         });

             
           }

           $scope.CasualTransactionreset = function(CasualTransaction){
             $scope.CasualTransaction={};
             $scope.CasualTransaction = " ";
             CasualTransaction.$setPristine();
           };

           

            $scope.submitAndClose=function(CasualTransactionData) {
              $scope.CasualTransaction=new CasualTransactionService(CasualTransactionData);
             $scope.CasualTransaction.$save().then(function(data){
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
            $rootScope.$emit("CallLoadCasualTransactions", {});
            $scope.CasualTransactionreset(CasualTransaction);

          },


          function() {
           $scope.SuccessMsg=false;
           $scope.errorMsg = 'Server Request Error';
         });

             
           }           
         }

         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualTransactionService','CasualTransaction'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualTransactionService,CasualTransaction) {
          $scope.CasualTransactionModel=CasualTransaction;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.updateCasualTransaction=function(CasualTransactionModel){
           $scope.CasualTransaction=new CasualTransactionService(CasualTransactionModel);
           CasualTransaction.$update().then(function(){
             $rootScope.$emit("CallLoadCasualTransactions", {});
             $scope.CasualTransaction=CasualTransaction;
           });
         };

       }
     }
   }

 })();
