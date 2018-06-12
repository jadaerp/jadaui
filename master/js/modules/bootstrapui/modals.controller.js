/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$uibModal'];
    function ModalController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'CompInfoContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });




            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };



   vm.show= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'ModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });




            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };


 vm.showStatutory= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'StatutoryModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });




            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };

          vm.showloans= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'loansModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

           vm.showpension= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'PensionModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

        vm.display= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'template.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };


          vm.add= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'add.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

           vm.more= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'mytemplate.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };


           vm.info= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'myContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

           vm.addperiods= function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'fperiods.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
          function ModalInstanceCtrl($scope, $uibModalInstance) {
          
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
             $scope.submitCompinfo=function() {
          // $scope.formModel.$save();
          console.log('Saving user: ' +$scope.Company.pin_number);
          };
         
          }
        }
    }

})();
