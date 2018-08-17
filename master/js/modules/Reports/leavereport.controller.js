(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('LeaveReportController', LeaveReportController);

    LeaveReportController.$inject = ['$scope','$http','$resource', 'LeaveReportService','jadaApiUrl'];
    function LeaveReportController($scope,$http,$resource,LeaveReportService,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
                        $http.get(jadaApiUrl+'api/currentperiod').success(function(data) {
              
              
              var currentPeriodData=data;
              $scope.currentPeriod=currentPeriodData;

              var currentPeriod=currentPeriodData.id;
              
            //   $http.get(jadaApiUrl+'api/leavereport/'+currentPeriod).success(function(data) {
            //   $scope.leaveReportData = data;

              
            //   $scope.leaveReport= $scope.leaveReportData.leaveTypeReportList[0].employeeLeaveReportList;
              
            // });
         

            });
             $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });                        
              $scope.getReport=function(periodId,leaveTypeId){



                $http.get(jadaApiUrl+'api/leaveReport/'+periodId+'/'+leaveTypeId).success(function(data) {
             
              $scope.leaveReportData=data;
              $scope.leaveReport= $scope.leaveReportData.leaveTypeReportList[0].employeeLeaveReportList;
              console.log($scope.leaveReport);

            });
            }
          
$http.get(jadaApiUrl+'api/leavetype').success(function(data) {
              $scope.leavetypes = data;



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

$scope.getFirstLeave=function(){
 var firstleave=0;
  $http.get(jadaApiUrl+'api/leavetype').success(function(data) {
              $scope.leavetypes = data;
              firstleave=$scope.leavetypes[0].id;
        


            });
    return firstleave;
 
}
var firstl=$scope.getFirstLeave();


              $scope.show=function(id){
                console.log($scope.leaves);
          
          if($scope.leaves.leaveTypeReportList!=null){
            for(var r=0;r<$scope.leaves.leaveTypeReportList.length;r++){
                  if(id==$scope.leaves.leaveTypeReportList[r].leaveType.id){

                    
                    $scope.leaveReport=$scope.leaves.leaveTypeReportList[r].employeeLeaveReportList;
                  }
                  
                }
          }
                
                
  // $scope.currentleaveType='Exam'+id;
              }

            

           



        }
    }
})();