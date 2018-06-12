

(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('PayrollJournalReportController', PayrollJournalReportController);

    PayrollJournalReportController.$inject = ['$scope','$http','$resource','jadaApiUrl','PayrollLedgerReportService','FileSaver','Blob'];
    function PayrollJournalReportController($scope,$http,$resource,jadaApiUrl,PayrollLedgerReportService,FileSaver,Blob) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


$http.get(jadaApiUrl+'api/payrollledgerreport/0').then(function(data) {
    console.log(data);
           $scope.jounalreports=data.data;


 
     });
     console.log($scope.jounalreports)
$http.get(jadaApiUrl+'api/pastelexport').then(function(data) {
    
           $scope.pastelExportData=data.data;
          

 
     });            

            $scope.filterData=function(filter){
                var filterType=filter.filterType;
$http.get(jadaApiUrl+'api/payrollledgerreport/'+filterType).then(function(data) {
    console.log(data);
           $scope.jounalreports=data.data;


 
     });
            }

  $scope.download = function(table) {
    // var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
    // FileSaver.saveAs(data, 'text.txt');
console.log($scope.pastelExportData);
var arr = JSON.parse($scope.pastelExportData);
var file = new File(arr, 'sample.txt', {
    lastModified: new Date(0), // optional - default = now
    type: "overide/mimetype" // optional - default = ''
});

  var ele = document.getElementById(table);
var blob = new Blob([ele.innerText], {
        type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, "pastel.txt");
 



};
           

          


        }
    }
})();
















