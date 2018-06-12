 (function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('P10cController', P10cController);

    P10cController.$inject = ['$scope','$http','$resource', 'P10cService','jadaApiUrl'];
    function P10cController($scope,$http,$resource,P10cService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


        $scope.ptencs=P10cService.get({year:2017});
        console.log($scope.ptencs);

          
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });



              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });

               $scope.getByperiod=function(report) {

          if(report!=null && report!=""){
           
                 $scope.ptencs=P10cService.get({year:report});

          }
        
         };


                   $scope.showcurrentYear=function(id){
                for(var r=0;r< $scope.periods.length;r++){
                  if(id==$scope.periods[r].id){

              
                    $scope.currentYear=$scope.periods[r].year;
                    console.log($scope.currentYear)
                  }
                  
                }
                
              }


        }
    }
})();