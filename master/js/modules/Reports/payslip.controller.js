

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
$http.get(jadaApiUrl+'api/paypoint').then(function(data) {
  $scope.payPointList=data.data;
  console.log($scope.payPointList);
});

$scope.getp=function(){

return $http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
    $("#progress-panel").find(".panel-body").addClass(" whirl helicopter");
          $scope.searchpayslipByperiod(data.data.id);  
         
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
              $("#progress-panel").find(".panel-body").removeClass(" whirl helicopter");
              $("#please-wait").html("");
              $("#wait-message").html("");
             
     $scope.numberOfPages = function() {
        return Math.ceil($scope.persons.length / $scope.pageSize);
      };

            });
     


 }
  
}





         $scope.searchPayslip=function(user) {
 // $scope.persons= null;
          if(user.period!=null && user.period!="" &&( user.payPoint=="" || user.payPoint==null )){
    
           var employeeId=user.employeeNumber;
           var period=user.period;

 $scope.curPage = 0;
 $scope.pageSize = 1;
     $("#progress-panel").find(".panel-body").addClass(" whirl helicopter");
              $("#please-wait").html("please wait");
              $("#wait-message").html("fetching single employee payslip");

          $http.get(jadaApiUrl+'api/payslipreport//'+period+'/'+employeeId).success(function(data) {
                $scope.persons= data;
              $("#progress-panel").find(".panel-body").removeClass(" whirl helicopter");
              $("#please-wait").html("");
              $("#wait-message").html("");




         $scope.numberOfPages = function() {
        return Math.ceil($scope.persons.length / $scope.pageSize);
      };


            });

          }else if(user.period!=null && user.period!="" &&( user.payPoint!="" || user.payPoint!=null )){
    
           
           var period=user.period;
           var payPointId=user.payPoint;

 $scope.curPage = 0;
 $scope.pageSize = 1;
     $("#progress-panel").find(".panel-body").addClass(" whirl helicopter");
              $("#please-wait").html("please wait");
              $("#wait-message").html("fetching payslip from selected paypoint");

          $http.get(jadaApiUrl+'api/payslipreportbypaypoint//'+period+'/'+payPointId).success(function(data) {
                $scope.persons= data;
              $("#progress-panel").find(".panel-body").removeClass(" whirl helicopter");
              $("#please-wait").html("");
              $("#wait-message").html("");




         $scope.numberOfPages = function() {
        return Math.ceil($scope.persons.length / $scope.pageSize);
      };


            });

          }else if(user.period!=null && user.period!="" && ( user.payPoint=="" || user.payPoint==null ) && (user.employee==null || user.employee=="") ){
    
           var employeeId=user.employeeNumber;
           var period=user.period;

 $scope.curPage = 0;
 $scope.pageSize = 1;
     $("#progress-panel").find(".panel-body").addClass(" whirl helicopter");
              $("#please-wait").html("please wait");
              $("#wait-message").html("fetching single employee payslip");

          $http.get(jadaApiUrl+'api/payslipreport//'+period+'/'+employeeId).success(function(data) {
                $scope.persons= data;
              $("#progress-panel").find(".panel-body").removeClass(" whirl helicopter");
              $("#please-wait").html("");
              $("#wait-message").html("");




         $scope.numberOfPages = function() {
        return Math.ceil($scope.persons.length / $scope.pageSize);
      };


            });

          }
          
          
          

         };


// $http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
//           $scope.user={};
//           $scope.currentPeriodData=data.data;
//     $scope.currentperiod=$scope.currentPeriodData.period;
//       $scope.user.period=$scope.currentperiod;
     

//       $scope.searchpayslipByperiod($scope.currentperiod);
//      });



  $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });


     $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.user={};
              $scope.employees = data;
            
         
          
            });



$scope.printDiv = function (div) {
 
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