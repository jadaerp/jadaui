(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('payeSummaryController', payeSummaryController);

    payeSummaryController.$inject = ['$scope','$http','$resource', 'PayeSummaryService','jadaApiUrl'];
    function payeSummaryController($scope,$http,$resource,PayeSummaryService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

// var currentperiod=0;
//           // $scope.psummaries=PayeSummaryService.get({periodId:currentperiod});

//            $http.get(jadaApiUrl+'api/payesummary/'+currentperiod).success(function(data) {
//                $scope.psummaries = data;
//                    console.log(  $scope.psummaries);

//             });

      

             $scope.getByperiod=function(period){
        
       $http.get(jadaApiUrl+'api/payesummary/'+period).success(function(data) {
               $scope.psummaries = data;

            });


          }
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });

              $http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
            
         
          $scope.currentPeriod=data.data;
   
          $scope.currentMonth=$scope.currentPeriod.month+ ' '+$scope.currentPeriod.year;
          var periodId= $scope.currentPeriod.id;
          console.log(periodId);
          $scope.getByperiod(periodId);
      
  
            });


 $scope.showcurrentperiod=function(id){
               console.log(id)
                for(var r=0;r< $scope.periods.length;r++){
                  if(id==$scope.periods[r].id){

              
                    $scope.currentMonth=$scope.periods[r].month+' '+$scope.periods[r].year;
                    console.log($scope.currentMonth)
                  }
                  
                }
                


  // $scope.currentleaveType='Exam'+id;
              }
        }
    }
})();