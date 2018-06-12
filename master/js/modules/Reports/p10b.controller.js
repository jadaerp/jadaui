(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('P10bController', P10bController);

    P10bController.$inject = ['$scope','$http','$resource', 'P10bService','jadaApiUrl'];
    function P10bController($scope,$http,$resource,P10bService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


        $scope.ptenbs=P10bService.get({year:2017});
        console.log($scope.ptenbs);

          
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


                 $scope.getTotal = function(type) {
        var total = 0;
        angular.forEach($scope.ptenbs, function(el) {
            total += el[type];
        });
        return total;
    };
        }




       
    }
})();