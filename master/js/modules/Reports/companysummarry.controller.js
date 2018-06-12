(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('CompanySumarryController', CompanySumarryController);

    CompanySumarryController.$inject = ['$scope','$http','$resource', 'CompanySummaryService','jadaApiUrl'];
    function CompanySumarryController($scope,$http, $resource,CompanySummaryService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


 



$http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
    
          $scope.currentPeriodData=data.data;
    $scope.currentperiod=$scope.currentPeriodData.period;

     
       $scope.companysumaries=CompanySummaryService.get({periodId:$scope.currentperiod});
       console.log($scope.companysumaries);
 
     });

$scope.searchCsummaryByperiod=function(id){
             
 if(id!=null && id!=""){


    $scope.companysumaries=CompanySummaryService.get({periodId:id});
 }
  
}
          

              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });





                        
$scope.printDiv = function (div) {
    console.log('hellow print');
  var docHead = document.head.outerHTML;
  var printContents = document.getElementById(div).outerHTML;
  var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

  var newWin = window.open("", "_blank", winAttr);
  var writeDoc = newWin.document;
  writeDoc.open();
  writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
  writeDoc.close();
  newWin.focus();
}

        }
    }
})();