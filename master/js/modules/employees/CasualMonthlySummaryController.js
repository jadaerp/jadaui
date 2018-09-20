


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


         var SuccessMsg;
         var errorMsg;

         CasualMonthlySummaryService.get()
       .$promise
       .then(function(data){
                 $scope.CasualMonthlySummaryList = data.casualMonthlySummaryList;
                 console.log($scope.CasualMonthlySummaryList);

       });
          
          // $scope.CasualMonthlySummaryList=$scope.list.casualMonthlySummaryList;
          //  console.log($scope.list.data);
       // $http.get(jadaApiUrl+'api/casualmonthlysummary/').success(function(data) {
       //           $scope.CasualMonthlySummaryList = data;
                

       //        });
         
         

    

       $http.get(jadaApiUrl+'api/casualcategory/').success(function(data) {
                 $scope.casualCategoryList = data;
           

              });     
        $scope.CasualMonthlySummaryModel=new CasualMonthlySummaryService();
       $scope.processReport=function(CasualMonthlySummaryModel){
     
        
        CasualMonthlySummaryModel.$save().then(function(data){
    
    console.log(data); 
                 $scope.CasualMonthlySummaryList = data.casualMonthlySummaryList;
                 console.log($scope.CasualMonthlySummaryList);          
        });
       }

         // $scope.loadCasualMonthlySummarys = function () {
         //   $scope.CasualMonthlySummaryList=CasualMonthlySummaryService.query();

         // }




     }
   }

 })();
