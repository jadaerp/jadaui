


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualPaymentController', CasualPaymentController);

  CasualPaymentController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','CasualPaymentService','$stateParams', '$state'];
  function CasualPaymentController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, CasualPaymentService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

          $scope.CasualPaymentModel={};
         $scope.CasualPaymentModel.clockIn = new Date();          
         $scope.CasualPaymentModel.clockOut = new Date(); 
         $scope.CasualPaymentModel.date = new Date(); 
         var SuccessMsg;
         var errorMsg;


         $scope.CasualPaymentList=CasualPaymentService.query();

       $http.get(jadaApiUrl+'api/casuals/').success(function(data) {
                 $scope.casualList = data;
           

              });

       $http.get(jadaApiUrl+'api/casualcategory/').success(function(data) {
                 $scope.casualCategoryList = data;
           

              });       

         $scope.loadCasualPayments = function () {
           $scope.CasualPaymentList=CasualPaymentService.query();

         }

         $rootScope.$on("CallLoadCasualPayments", function(){
           $scope.loadCasualPayments();
         });





         $scope.delete= function (CasualPayment) {
          $scope.CasualPayment=new CasualPaymentService(CasualPayment);
          CasualPayment.$remove().then(function () {
            $scope.loadCasualPayments();
          });
        }

        $scope.getHoursDone=function (CasualPaymentModel){
          
          var startDate = new Date(CasualPaymentModel.clockIn);
          // Do your operations
          var endDate   = new Date(CasualPaymentModel.clockOut);
          var hoursDone = (endDate.getTime() - startDate.getTime())/1000/3600;  
          CasualPaymentModel.hoursDone=hoursDone;
              if(CasualPaymentModel.casualCategoryId==null || CasualPaymentModel.casualCategoryId==""){
                alert("Casual Category not selected");
                return;
              } 
              if(CasualPaymentModel.hoursDone==null || CasualPaymentModel.hoursDone<=0 ){
                alert("Hours Done must be greater than zero");
                return;
              }                 
       $http.get(jadaApiUrl+'api/casualcategory/'+CasualPaymentModel.casualCategoryId).success(function(data) {
                 var casualCategory=data;
                 CasualPaymentModel.amountDue=casualCategory.rate*CasualPaymentModel.hoursDone;
                 
           

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





        $scope.show = function(CasualPayment) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'casual-payment-modal.html',
        controller: ModalInstanceCtrl,
        resolve: {
         CasualPayment: function () {
           return CasualPayment;
         }
       }        
        // scope : $scope
      });
    };

        $scope.showSlip = function(CasualPayment) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'casual-slip.html',
        controller: SlipModalInstanceCtrl,
        resolve: {
         CasualPayment: function () {
           return CasualPayment;
         }
       }        
        // scope : $scope
      });
    };    




    


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.
         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualPaymentService','CasualPayment'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualPaymentService,CasualPayment) {
          $scope.CasualPaymentModel=CasualPayment;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.payCasual=function(CasualPaymentModel){
           
          CasualPaymentModel.$update().then(function(){
             $rootScope.$emit("CallLoadCasualPayments", {});
             $scope.CasualPaymentModel=CasualPaymentModel;
             $scope.ok();
           });
         };

       }

         SlipModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','CasualPaymentService','CasualPayment'];
         function SlipModalInstanceCtrl($scope, $rootScope,$uibModalInstance, CasualPaymentService,CasualPayment) {
          $scope.CasualPaymentModel=CasualPayment;
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!

          var yyyy = today.getFullYear();
          if(dd<10){
              dd='0'+dd;
          } 
          if(mm<10){
              mm='0'+mm;
          } 
          $scope.date = dd+'/'+mm+'/'+yyyy;

          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.approveCasual=function(CasualPaymentModel){
           
          CasualPaymentModel.$update().then(function(){
             $rootScope.$emit("CallLoadCasualPayments", {});
             $scope.CasualPaymentModel=CasualPaymentModel;
           });
         };

        $scope.printSlip = function (div) {
         
          var docHead = document.head.outerHTML;
          var printContents = document.getElementById(div).outerHTML;
          var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

          var newWin = window.open("", "_blank", winAttr);
          var writeDoc = newWin.document;
          writeDoc.open();
          writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
          writeDoc.close();
          newWin.focus();
          $scope.ok();
        }           

       }       
     }
   }

 })();
