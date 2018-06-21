(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('BankFilesController', BankFilesController);

    BankFilesController.$inject = ['$scope','$http','$resource', 'BankfileService','jadaApiUrl','FileSaver','Blob'];
    function BankFilesController($scope,$http,$resource,BankfileService,jadaApiUrl,FileSaver,Blob) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
vm.val = {
    text: 'Hey ho lets go!'
  };

  $scope.download = function(table) {
    // var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // FileSaver.saveAs(data, 'text.txt');

              $http.get(jadaApiUrl+'api/bankfileexport').success(function(data) {
                console.log(data);
              // $scope.employees = data;
          
            });

//   var ele = document.getElementById(table);
// var blob = new Blob([ele.innerText], {
//         type: "text/plain;charset=utf-8"
//     });
//     FileSaver.saveAs(blob, "bank-file.txt");
};



       var currentPeriod=1;
        $scope.bankfiles=BankfileService.get({});

          console.log($scope.bankfiles);


              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


        }
    }
})();