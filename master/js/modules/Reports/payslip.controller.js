

(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('PayslipController', PayslipController);

    PayslipController.$inject = ['$scope','$rootScope','$http','$resource', 'PayslipService','jadaApiUrl','CurrentPeriod'];
    function PayslipController($scope,$rootScope,$http,$resource,PayslipService,jadaApiUrl,CurrentPeriod) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

$scope.getp=function(){

return $http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
            
         
          return data.data.id;
      
  
            });




}



var curr=$scope.getp().then(function(data){
 var curr=data.id;
  console.log();

});

var response=angular.fromJson(curr);
console.log('curr');
console.log(curr);

$scope.searchpayslipByperiod=function(id){

             
 if(id!=null && id!=""){


   $rootScope.pid=id;
   

 $scope.curPage = 0;
 $scope.pageSize = 1;

    $http.get(jadaApiUrl+'api/payslipreport/'+id).success(function(data) {
            $scope.persons = data;
              $scope.message='helllo period';
                 console.log('helllo period');
              console.log($scope.persons);
             
     $scope.numberOfPages = function() {
        return Math.ceil($scope.persons.length / $scope.pageSize);
      };

            });
     


 }
  
}





         $scope.searchPayslip=function(user) {
 // $scope.persons= null;
          if(user.period!=null && user.period!=""){
    
           var employeeId=user.employeeNumber;
           var period=user.period;

 $scope.curPage = 0;
 $scope.pageSize = 1;
     
          $http.get(jadaApiUrl+'api/payslipreport//'+period+'/'+employeeId).success(function(data) {
                $scope.persons= data;


                 $scope.message="hellow period";
      console.log('////hapa');
              console.log($scope.persons);

         $scope.numberOfPages = function() {
        return Math.ceil($scope.persons.length / $scope.pageSize);
      };


            });

          }
          

         };


$http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
          $scope.user={};
          $scope.currentPeriodData=data.data;
    $scope.currentperiod=$scope.currentPeriodData.period;
      $scope.user.period=$scope.currentperiod;
     

      $scope.searchpayslipByperiod($scope.currentperiod);
     });



  $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


     $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.user={};
              $scope.employees = data;
            
         
          
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