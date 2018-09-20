


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
 (function() {
  'use strict';

  angular
  .module('app.bootstrapui')
  .controller('CasualPayeReportController', CasualPayeReportController);

  CasualPayeReportController.$inject = ['jadaApiUrl','$http','$scope','$rootScope', '$uibModal','CasualPayeReportService','$stateParams', '$state'];
  function CasualPayeReportController(jadaApiUrl,$http,$scope, $rootScope, $uibModal, CasualPayeReportService,$stateParams, $state) {
    var vm = this;

    activate();

        ////////////////

        function activate() {


         var SuccessMsg;
         var errorMsg;

         $scope.CasualPayeReportModel=new CasualPayeReportService();
       $scope.processReport=function(CasualPayeReportModel){
     
        
        $scope.CasualPayeReportModel.$save().then(function(data){
    
    console.log(data); 
                 $scope.CasualPayeReportList = data.casualPayeList;
                 console.log($scope.CasualPayeReportList);          
        });
       }

         // $scope.loadCasualPayeReports = function () {
         //   $scope.CasualPayeReportList=CasualPayeReportService.query();

         // }




     }
   }

 })();
