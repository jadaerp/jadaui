


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('AdvanceApprovalController', AdvanceApprovalController);

  AdvanceApprovalController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','AdvanceApprovalService','$stateParams', '$state'];
  function AdvanceApprovalController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, AdvanceApprovalService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

 
         var SuccessMsg;
         var errorMsg;


         $scope.AdvanceApprovalList=AdvanceApprovalService.query();


   











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






        $scope.show = function(AdvanceApproval) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'advance-reciept.html',
        controller: ModalInstanceCtrl,
        resolve: {
         AdvanceApproval: function () {
           return AdvanceApproval;
         }
       }        
        // scope : $scope
      });
    };




    




         ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','AdvanceApprovalService','AdvanceApproval'];
         function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, AdvanceApprovalService,AdvanceApproval) {
          $scope.AdvanceApprovalModel=AdvanceApproval;
          $scope.ok = function () {
            $uibModalInstance.close('closed');
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
          
          

          $scope.updateAdvanceApproval=function(AdvanceApprovalModel){
           $scope.AdvanceApproval=new AdvanceApprovalService(AdvanceApprovalModel);
           AdvanceApproval.$update().then(function(){
             $rootScope.$emit("CallLoadAdvanceApprovals", {});
             $scope.AdvanceApproval=AdvanceApproval;
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






     }
   }

 })();
