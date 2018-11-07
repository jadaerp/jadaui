


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('ApprovedAdvanceListController', ApprovedAdvanceListController);

  ApprovedAdvanceListController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','ApprovedAdvanceListService','$stateParams', '$state'];
  function ApprovedAdvanceListController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, ApprovedAdvanceListService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

 
         var SuccessMsg;
         var errorMsg;


         $scope.ApprovedAdvanceList=ApprovedAdvanceListService.query();
         // console.log($scope.ApprovedAdvanceList);


   











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






        $scope.show = function(ApprovedAdvance) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'advance-reciept.html',
        controller: ModalInstanceCtrl,
        resolve: {
         ApprovedAdvance: function () {
           return ApprovedAdvance;
         }
       }        
        // scope : $scope
      });
    };


         $scope.loadApprovedAdvanceLists = function () {
           $scope.ApprovedAdvanceListList=ApprovedAdvanceListService.query();

         }

         $rootScope.$on("CallLoadApprovedAdvanceLists", function(){
           $scope.loadApprovedAdvanceLists();
         });


        $scope.approve= function(ApprovedAdvanceList) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'advance-approval-modal.html',
        controller: ModalInstanceCtrl1,
        resolve: {
         ApprovedAdvanceList: function () {
           return ApprovedAdvanceList;
         }
       }        
        // scope : $scope
      });
    };

    




         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','ApprovedAdvanceListService','ApprovedAdvance'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, ApprovedAdvanceListService,ApprovedAdvance) {

          $scope.ApprovedAdvanceModel=ApprovedAdvance;

          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.submitApproval=function(ApprovedAdvanceListModel){
           $scope.ApprovedAdvanceList=new ApprovedAdvanceListService(ApprovedAdvanceListModel);
           ApprovedAdvanceList.$update().then(function(){
             $rootScope.$emit("CallLoadApprovedAdvanceLists", {});
             $scope.ApprovedAdvanceList=ApprovedAdvanceList;
           });
         };

        $scope.printReceipt = function (div) {
         
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

         ModalInstanceCtrl1.$inject = ['$scope', '$rootScope','$uibModalInstance','ApprovedAdvanceListService','ApprovedAdvanceList'];
         function ModalInstanceCtrl1($scope, $rootScope,$uibModalInstance, ApprovedAdvanceListService,ApprovedAdvanceList) {
          $scope.ApprovedAdvanceListModel=ApprovedAdvanceList;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          

          $scope.submitApproval=function(ApprovedAdvanceListModel){
           
           ApprovedAdvanceListModel.$save().then(function(){
             $rootScope.$emit("CallLoadApprovedAdvanceLists", {});
             $scope.ApprovedAdvanceList=ApprovedAdvanceList;
           });
         };
       

       }




     }
   }

 })();
