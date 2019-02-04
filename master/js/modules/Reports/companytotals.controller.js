(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('CompanyTotalsController', CompanyTotalsController);

    CompanyTotalsController.$inject = ['$scope','$http','$resource', 'CompanyTotalsService','jadaApiUrl','Excel','$timeout'];
    function CompanyTotalsController($scope,$http,$resource,CompanyTotalsService,jadaApiUrl,Excel,$timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

       var period=1;
        // $scope.companytotals=CompanyTotalsService.get({periodId:1});

          // $scope.getByperiod=function(period){
        
          //   $scope.companytotals=CompanyTotalsService.get({periodId:period});

          // }
          $("#progress-panel").removeClass("whirl helicopter");

           $scope.getByperiod=function(ctotal){
               $("#progress-panel").addClass("whirl helicopter");
             var periodId=ctotal.period==null?"0":ctotal.period;
             var departmentId=ctotal.department==null?"0":ctotal.department;
          
             var employeeCategoryId=ctotal.category==null?"0":ctotal.category;
             var employeeGroupId=ctotal.group==null?"0":ctotal.group;
             var payPointId=ctotal.payPoint==null?"0":ctotal.payPoint;
             
               $http.get(jadaApiUrl+'api/CompanyTotalsReport/'+periodId+'/'+departmentId+'/'+employeeGroupId+'/'+employeeCategoryId+'/'+payPointId).success(function(data){
             $scope.companytotals=data;
             $("#progress-panel").removeClass("whirl helicopter");
             
console.log($scope.companytotals);
            });


          }

          $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    }
}



    
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });

    
              $http.get(jadaApiUrl+'api/paypoint').success(function(data) {
              $scope.payPointList = data;

            });

$http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
        var period=0;
        $scope.ctotal={};
          $scope.currentPeriod=data.data;
          period=$scope.currentPeriod.period;
          $scope.ctotal.period=period;
  
    $scope.getByperiod($scope.currentPeriod);
     });




  $http.get(jadaApiUrl+'api/department').success(function(data) {
                $scope.departments = data;

              });
  console.log('ddd')
  console.log($scope.departments);

  $http.get(jadaApiUrl+'api/costcenter').success(function(data) {
                $scope.centers = data;

              });

  $http.get(jadaApiUrl+'api/employeegroup').success(function(data) {
                $scope.groups = data;

              });

  $http.get(jadaApiUrl+'api/employeecategory').success(function(data) {
                $scope.categories = data;

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



 $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
            $timeout(function(){location.href=exportHref;
            },100); // trigger download
        }




        }
    }
})();