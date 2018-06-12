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
              console.log("current period");
              console.log(currentPeriodData.id);
              var currentPeriod=currentPeriodData.id;
              $scope.leaves=LeaveReportService.get({periodId:currentPeriod});
              $http.get(jadaApiUrl+'api/leavereport/'+currentPeriod).success(function(data) {
              $scope.leavedefault = data;


            });
         
        
         
       
              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });
              $scope.getReport=function(periodId,leaveTypeId){
                // $scope.leaves=LeaveReportService.get({periodId:periodId,leaveTypeId:leaveTypeId});
                // console.log($scope.leaves);
                // $scope.leaveReport= $scope.leaves.leaveTypeReportList[0].employeeLeaveReportList;


                $http.get(jadaApiUrl+'api/leaveReport/'+periodId+'/'+leaveTypeId).success(function(data) {
              // console.log(data.leaveTypeReportList[0].employeeLeaveReportList);
              $scope.leaveReport= data.leaveTypeReportList[0].employeeLeaveReportList;
              console.log($scope.leaveReport);

            });
            }

              

            });

          
$http.get(jadaApiUrl+'api/leavetype').success(function(data) {
              $scope.leavetypes = data;
              $scope.firstLeaveType=$scope.leavetypes[0].id;
              // console.log($scope.firstLeaveType)


            });
 // console.log($scope.firstLeaveType)
  
            // for(var r=0;r<$scope.leaves.leaveTypeReportList.length;r++){
            //                     console.log($scope.leavetypes[0]);
            //       if($scope.leavetypes[0].id==$scope.leaves.leaveTypeReportList[r].leaveType.id){
                    
            //         console.log($scope.leaves.leaveTypeReportList[r]);
            //         $scope.leaveReport=$scope.leaves.leaveTypeReportList[0].employeeLeaveReportList;
            //       }
            //     }

              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });

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