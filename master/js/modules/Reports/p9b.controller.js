(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('P9bController', P9bController);

    P9bController.$inject = ['$scope','$http','$resource', 'LeaveReportService','jadaApiUrl'];
    function P9bController($scope,$http,$resource,LeaveReportService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


          var year=2017;

       var employeeId=5;
          
              $http.get(jadaApiUrl+'api/p9breport/'+year+'/'+employeeId).success(function(data) {
              $scope.p9bs = data;
                    console.log( $scope.p9bs);

            });


        $scope.searchP9b=function(user) {

          if(user.year!=null && user.year!=""){
           
                  var employeeId=user.employeeId;
          var year=user.year;
          
        $http.get(jadaApiUrl+'api/p9breport/'+year+'/'+employeeId).success(function(data) {
              $scope.p9bs = data;
                    console.log( $scope.p9bs);

            });

          }
          
  

         };

          
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


        }
    }
})();