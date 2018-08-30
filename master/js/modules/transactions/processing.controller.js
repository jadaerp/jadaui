
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.transactions')
        .controller('PayrollProcessController', PayrollProcessController);

   PayrollProcessController.$inject = ['$scope','$http','$rootScope', '$uibModal','PayrollProcessingService','$stateParams', '$state','$timeout','jadaApiUrl'];
    function PayrollProcessController($scope,$http, $rootScope,$uibModal, PayrollProcessingService,$stateParams, $state,$timeout,jadaApiUrl) {
        var vm = this;

        activate();

       
        ////////////////

        function activate() {

 $http.get(jadaApiUrl+'api/currentperiod').success(function(data){
  $scope.currentPeriod=data;
 })
          
$scope.groups=PayrollProcessingService.query();

$scope.currentclass='danger';
    $scope.buttonText="Process";

 $scope.process= function () {
    // $scope.buttonText="processing";
    $scope.currentclass='whirl ringed';
    $scope.buttonprocess=true;
      $http.post(jadaApiUrl+'api/payrolltransaction').success(function(){
    
 $scope.buttonText="Processing";
                  },function(err){
            $scope.buttonText="failed";
            }).finally(function(){
              $scope.currentclass='process';
            $scope.buttonText="Process";
            });
            };



          
          

$scope.clickBtn = function() {
  $scope.loading = true; // start loading
  $timeout(function() {
    $scope.loading = false; // stop loading
  }, 2000);
}


      
        }
    }

})();
