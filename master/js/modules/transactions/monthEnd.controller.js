
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.transactions')
        .controller('monthEndController', monthEndController);

   monthEndController.$inject = ['$scope','$http','$rootScope', '$uibModal','$stateParams', '$state','$timeout','jadaApiUrl'];
    function monthEndController($scope,$http, $rootScope,$uibModal, $stateParams, $state,$timeout,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


 $http.get(jadaApiUrl+'api/currentperiod').success(function(data){
  $scope.currentPeriod=data;
 });
      

$scope.currentclass='danger';
    $scope.buttonText="Process";

 $scope.endMonth= function () {
    // $scope.buttonText="processing";
    $scope.currentclass='whirl ringed';
    $scope.buttonprocess=true;
      $http.post(jadaApiUrl+'api/endmonth').success(function(){
    $state.reload();
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
