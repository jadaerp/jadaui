(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('HelbController', HelbController);

    HelbController.$inject = ['$scope','$http','$resource', 'HelbService','jadaApiUrl'];
    function HelbController($scope,$http,$resource,HelbService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

var currentperiod=0;
        $scope.helbs=HelbService.get({periodId:currentperiod});
        console.log($scope.helbs);

          
                     $scope.getByperiod=function(period){
        
     console.log('hellow')
        $scope.helbs=HelbService.get({periodId:period});

          }

              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });


$http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
            
         
          $scope.currentPeriod=data.data;
          console.log($scope.currentPeriod.month);
          $scope.currentMonth=$scope.currentPeriod.month+ ' '+$scope.currentPeriod.year;
      
  
            });


              $scope.showcurrentperiod=function(id){
               console.log(id)
                for(var r=0;r< $scope.periods.length;r++){
                  if(id==$scope.periods[r].id){

              
                    $scope.currentMonth=$scope.periods[r].month+' '+$scope.periods[r].year;
                    console.log($scope.currentMonth)
                  }
                  
                }
                
              }

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