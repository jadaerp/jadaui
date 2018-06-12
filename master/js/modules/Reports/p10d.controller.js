(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('P10dController', P10dController);

    P10dController.$inject = ['$scope','$http','$resource', 'P10dService','jadaApiUrl'];
    function P10dController($scope,$http,$resource,P10dService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            var date = new Date();
            var year = date.getFullYear();
        $scope.ptends=P10dService.get({year:year});
        console.log( $scope.ptends);



         $scope.getByperiod=function(report) {

          if(report.year!=null && report.year!=""){
           
                  var year=report.year;
                var quater=report.quater;
          $http.get(jadaApiUrl+'api/p10dreport/'+year+'/'+quater).success(function(data) {
                $scope.ptends = data;
        
             });

          }
        
         };

         
     // $scope.getByperiod=function(year){
     //     $scope.ptends=P10dService.get({year:year});
     // }

          
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


        }
    }
})();