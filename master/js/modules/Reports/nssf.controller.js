(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('NssfController', NssfController);

    NssfController.$inject = ['$scope','$http','$resource', 'NssfService','Excel','jadaApiUrl','$timeout'];
    function NssfController($scope,$http,$resource,NssfService,Excel,jadaApiUrl,$timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

var currentperiod=0;
        $scope.nssfs=NssfService.get({periodId:currentperiod});
           console.log( $scope.nssfs);
          
            
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


              $http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
            
         
          $scope.currentPeriod=data.data;
          console.log($scope.currentPeriod.month);
          $scope.currentMonth=$scope.currentPeriod.month+ ' '+$scope.currentPeriod.year;
          var periodId= $scope.currentPeriod.id;
          console.log(periodId);
          $scope.getByperiod(periodId);
  
            });



  $scope.getByperiod=function(period){
        
               $scope.nssfs=NssfService.get({periodId:period});

          }




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

               $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
            $timeout(function(){location.href=exportHref;},100); // trigger download
        }

        }
    }
})();