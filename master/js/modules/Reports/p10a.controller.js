(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('P10aController', P10aController);

    P10aController.$inject = ['$scope','$http','$resource', 'P10aService','jadaApiUrl'];
    function P10aController($scope,$http,$resource,P10aService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


        $scope.ptenas=P10aService.get({periodId:2017});

          console.log($scope.ptenas);
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });

              $scope.showcurrentYear=function(id){
               console.log(id)
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