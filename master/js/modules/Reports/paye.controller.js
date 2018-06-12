(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('PayeController', PayeController);

    PayeController.$inject = ['$scope','$http','$resource' ,'jadaApiUrl','PayeService'];
    function PayeController($scope,$http,$resource,jadaApiUrl,PayeService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

       var currentPeriod=1;
        $scope.payes=PayeService.get({periodId:1});
        console.log($scope.payes);

        // 


    
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


        }
    }
})();