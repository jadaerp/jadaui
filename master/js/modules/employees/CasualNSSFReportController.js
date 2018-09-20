


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualNSSFReportController', CasualNSSFReportController);

  CasualNSSFReportController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','CasualNSSFReportService','$stateParams', '$state'];
  function CasualNSSFReportController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, CasualNSSFReportService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {


         var SuccessMsg;
         var errorMsg;

         $scope.CasualNSSFReportModel=new CasualNSSFReportService();
       $scope.processReport=function(CasualNSSFReportModel){
     
        // var casualNSSFReportService=new CasualNSSFReportService(CasualNSSFReportModel);
        $scope.CasualNSSFReportModel.$save().then(function(data){
    
    // console.log(data); 
                 $scope.CasualNSSFReportList = data.casualNSSFList;
                 console.log($scope.CasualNSSFReportList);          
        });
       }

         // $scope.loadCasualNSSFReports = function () {
         //   $scope.CasualNSSFReportList=CasualNSSFReportService.query();

         // }




     }
   }

 })();
