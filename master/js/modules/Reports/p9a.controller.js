(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('P9aController', P9aController);

    P9aController.$inject = ['$scope','$http','$resource', 'P9aService','jadaApiUrl'];
    function P9aController($scope,$http,$resource,P9aService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


        // $scope.p9as=P9aService.get({ year: 2017});
  

console.log( $scope.p9as);

       var year=2017;

       var employeeId=0;
          
              $http.get(jadaApiUrl+'api/p9areport/'+year+'/'+employeeId).success(function(data) {
              $scope.p9as = data;
                    console.log( $scope.p9as);

            });


                 $scope.searchP9a=function(user) {

          if(user.year!=null && user.year!=""){
           
                  var employeeId=user.employeeId;
          var year=user.year;
          
        $http.get(jadaApiUrl+'api/p9areport/'+year+'/'+employeeId).success(function(data) {
              $scope.p9as = data;
                    console.log( $scope.p9as);

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