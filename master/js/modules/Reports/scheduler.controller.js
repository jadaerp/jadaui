

(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('SchedulerController', SchedulerController);

    SchedulerController.$inject = ['$rootScope','$state','$scope','$http','$resource','SchedulerService','SchedulerEmployeeBasedReportService','SchedulerPeriodBasedReportService','jadaApiUrl'];
    function SchedulerController($rootScope,$state,$scope,$http,$resource,SchedulerService,SchedulerEmployeeBasedReportService,SchedulerPeriodBasedReportService,jadaApiUrl) {
        var vm = this;

        activate();


        function activate() {

        
        $scope.employeeTypeFilterArray=[{description:"All Employees",value:"0"},{description:"Employee Category",value:"1"},{description:"Department",value:"2"},{description:"Cost Center",value:"3"},{description:"Employee Group",value:"4"}];
       $scope.scheduler={};
     
            

              $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods=data;

            });

              $scope.getEmployeeFilter=function(employeeTypeFilter){

                if(employeeTypeFilter=="1"){
                    $http.get(jadaApiUrl+'api/employeecategory').success(function(data) {
                    $scope.employeeFilterArray=data;              
                    });

                }else if(employeeTypeFilter=="2"){
                    $http.get(jadaApiUrl+'api/department').success(function(data) {
                    $scope.employeeFilterArray=data;              
                    });

                }else if(employeeTypeFilter=="3"){
                    $http.get(jadaApiUrl+'api/costcenter').success(function(data) {
                    $scope.employeeFilterArray=data;              
                    });

                }else if(employeeTypeFilter=="4"){
                    $http.get(jadaApiUrl+'api/employeegroup').success(function(data) {
                    $scope.employeeFilterArray=data;              
                    });

                }else{
                    $http.get(jadaApiUrl+'api/employee').success(function(data) {
                    $scope.employeeFilterArray=data;              
                    });

                }
              }

              $http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees=data;
          
            });

     var id=1;
              $http.get(jadaApiUrl+'api/company/'+id).success(function(data) {
              $scope.companyDetails= data;
              // console.log($scope.companyDetails)
          
            });

               $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
                 $scope.pcodes = data;
           // console.log($scope.pcodes);

              });
               $scope.employeeBasedReport=function(scheduler){
                
                var saveScheduler=new SchedulerService(scheduler);
                        saveScheduler.$save().then(function(data){
                          var response=angular.fromJson(data);
                          SchedulerEmployeeBasedReportService.setJson(data);
                          $scope.periodBasedSchedulerReport=response;
                          $state.go('app.employee-based-scheduler-report');
                          // console.log(response);

                        },
                         function() {
                           $scope.SuccessMsg=false;
                               $scope.errorMsg = 'Server Request Error';
                              });
                      



               }



               $scope.periodBasedReport=function(scheduler){
                    var saveScheduler=new SchedulerService(scheduler);
                        saveScheduler.$save().then(function(data){
                          var response=angular.fromJson(data);
                          SchedulerPeriodBasedReportService.setJson(data);
                          $scope.periodBasedSchedulerReport=response;
                          $state.go('app.period-based-scheduler-report');
                          // console.log(response);

                        },
                         function() {
                           $scope.SuccessMsg=false;
                               $scope.errorMsg = 'Server Request Error';
                              });
               }

  //              $scope.selectedPeriod=function(id){


  //                for(var r=0;r<$scope.periods.length;r++){
  //   if($scope.periods[r].id==id){
  //     $scope.periodid=$scope.periods[r].id;
  //  $scope.periodname=$scope.periods[r].month+' '+$scope.periods[r].year;
  //   }


  //   console.log($scope.bankBranchName);
  // }

  //               $scope.selectP=name;
  //               console.log($scope.selectP);

  //             }



            var model = {
employee: [
 {name: "employeeNumber", description: "Employee Number"},
{ name: "firstName", description: "First Name"},
          {name: "middleName", description: "Middle Name"},
          {name: "lastName", description: "Surname"}, 
         
          {name: "idNumber", description: "National ID Number"},
          {name: "passportNumber", description: "Passport Number"},
          {name: "countryOfIssuance", description: "Country of issue"},
          {name: "expiryDate", description: "Expiry date"},
          {name: "dateOfBirth", description: "Date of Birth"},
          {name: "maritalStatus", description: "Marital Status"},
          {name: "gender", description: "Gender"},
          {name: "dependencies", description: "Dependency"},
          {name: "nextOfKin", description: "Next of Kin"},
          {name: "nextOfKinRelationship", description: "Relationship with Next of Kin"},
          {name: "nextOfKinPhoneNumber", description: "Phone Number for Next of Kin"},
          {name: "disability", description: "Disability"},
          {name: "natureOfDisability", description: "Nature of Disability"},
          {name: "phoneNumber", description: "Phone Number"},
          {name: "emailAddress", description: "Email address"},
          {name: "physicalAddress", description: "Physical Address"},
          {name: "postalAddress", description: "Postal address"},
          {name: "pinNumber", description: "PIN Number"},
          {name: "nhifNumber", description: "NHIF number"},
          {name: "nssfNumber", description: "NSSF Number"},
          {name: "helbNumber", description: "HELB Number"},
          {name: "universityRegNo", description: "University Registration Number"},
          {name: "employmentDate", description: "Employment Date"},
          {name: "payPoint", description: "Pay Point"},
          {name: "payMode", description: "Pay Mode"},
          {name: "bankCode", description: "Bank Code"},
          {name: "bankName", description: "Bank Name"},
          {name: "bankBranch", description: "Bank Branch Name"},
          {name: "accountNumber", description: "Bank Account Number"},
          {name: "accountName", description: "Bank Account Name"},
          {name: "department", description: "Department"},
          {name: "costCenter", description: "Cost Center"},
          {name: "employeeCategory", description: "Employee category"},
          {name: "employeeGroup", description: "Employee Group"},
          
          {name: "position", description: "Position"}],

company: [{ name:"companyName", description: "Company Name" },
         { name:"companyPin", description: "Pin Number" },
          { name:"nssfNumbe", description: "NSSF Number"},
          { name:"nhifNumber", description: "NHIF Number"},
          { name:"helbNumber", description: "HELB Number"},
          { name:"country", description: "Country"},

          { name:"emailAddress", description: "Email Address"},
          { name:"physicalAddress", description: "Physical Address"},
          { name:"postalAddress", description: "Postal Address"},
          { name:"postalCode", description: "Postal Code"},
           { name:"telephoneNumber", description: "Telephone Number"},
          { name:"website", description: "Website"},
          { name:"workDays", description: "Work Days"}]
};
$scope.details=model;



// $scope.selectedColumns=[{ id:1, name: "First Name"},
//          { id:2, name: "Pin Number"},
//           { id:3, name: "Pension Number",}]

// $scope.selectedCompanyattribute=function(id){
//   $scope.companyDetails=[];
// console.log($scope.details);
//     for(var r=0;r<$scope.details.company.length;r++){
//     if($scope.details.company[r].id==id){
//       $scope.companyDetails.push($scope.details.company[r]);
//        console.log($scope.companyDetails);
//     }

   

 
//   }
//  // $scope.companyDetails.push({ name: "Company Name", value:"Timecon" });
//  // console.log($scope.companyDetails);

// }

$scope.periodBasedSchedulerReport=null;

   // $scope.submitScheduler=function(scheduler) {
   //  var saveScheduler=new SchedulerService(scheduler);
   //          saveScheduler.$save().then(function(data){
   //            var response=angular.fromJson(data);
   //            $scope.periodBasedSchedulerReport=response;
   //            console.log(response);

   //          },
   //           function() {
   //             $scope.SuccessMsg=false;
   //                 $scope.errorMsg = 'Server Request Error';
   //                });
          
   //          };



  // $scope.addHeader=function(period) {
  //      console.log('hellow');
  //  $scope.header.headers.push(period);
  //  console.log('hellow');
  // }


        }
    }
})();
















