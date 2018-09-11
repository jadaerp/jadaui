


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualMonthlySummaryController', CasualMonthlySummaryController);

  CasualMonthlySummaryController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','CasualMonthlySummaryService','$stateParams', '$state'];
  function CasualMonthlySummaryController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, CasualMonthlySummaryService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {

          $scope.CasualMonthlySummaryModel={};
         $scope.CasualMonthlySummaryModel.clockIn = new Date();          
         $scope.CasualMonthlySummaryModel.clockOut = new Date(); 
         $scope.CasualMonthlySummaryModel.date = new Date(); 
         var SuccessMsg;
         var errorMsg;


         $scope.CasualMonthlySummaryList=CasualMonthlySummaryService.query();

       $http.get(jadaApiUrl+'api/casuals/').success(function(data) {
                 $scope.casualList = data;
           

              });

       $http.get(jadaApiUrl+'api/casualcategory/').success(function(data) {
                 $scope.casualCategoryList = data;
           

              });       

         $scope.loadCasualMonthlySummarys = function () {
           $scope.CasualMonthlySummaryList=CasualMonthlySummaryService.query();

         }




     }
   }

 })();
