


  (function() {
      'use strict';

      angular
          .module('app.employees')
          .controller('CasualsController', CasualsController);

  CasualsController.$inject = ['$stateParams', '$rootScope','$state','$http','$scope', '$uibModal','CasualsService','jadaApiUrl'];
      function CasualsController($stateParams, $rootScope,$state,$http,$scope, $uibModal, CasualsService,jadaApiUrl) {
        
          var vm = this;

          activate();

          ////////////////

          function activate() {

  $scope.date= new Date();


    
    $scope.testDate = new Date($scope.date.getFullYear() - 10, $scope.date.getMonth(), 1);

  $scope.testDate = new Date($scope.date.getFullYear() - 10, $scope.date.getMonth(), 1);

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(2000, 1, 1),
    startingDay: 1
  };

    $scope.open = function() {
      $scope.popup.opened = true;
    };

    $scope.popup = {
      opened: false
    };

         //       $scope.today = function() {
         //       $scope.dt = new Date();
         //    };
         //    $scope.today();

         // $scope.clear = function () {
         //     $scope.dt = null;
         //    };

         //    // Disable weekend selection
         //   $scope.disabled = function(date, mode) {
         //      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
         //    };

         //   $scope.toggleMin = function() {
         //     $scope.minDate =  $scope.minDate ? null : new Date();
         //    };
         //    $scope.toggleMin();

         // $scope.open = function($event) {
         //      $event.preventDefault();
         //      $event.stopPropagation();

         //  $scope.opened = true;
         //    };

         //  $scope.dateOptions = {
         //      formatYear: 'yy',
         //      startingDay: 1
         //    };

         //   $scope.initDate = new Date('2019-10-20');
         //  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
         //  $scope.format =  $scope.formats[0];
          
             var SuccessMsg;
              var errorMsg;

             
            
          $scope.employees=CasualsService.query();


             var id = $stateParams.EmployeeId;
        $scope.employee={};
        // console.log("employee id : "+id );
            if(id!=null){
               $http.get(jadaApiUrl+'api/casuals/'+id).success(function(data) {

                $scope.employee = data;
       
               $scope.date = new Date($scope.employee.dateOfBirth);
             $scope.employee.dateOfBirth= new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);

                  $scope.date = new Date($scope.employee.expiryDate);
             $scope.employee.expiryDate= new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);

                  $scope.date = new Date($scope.employee.employmentDate);
             $scope.employee.employmentDate= new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);
         

          console.log($scope.employee.terminationDate);
                  $scope.employee.terminationDate= new Date($scope.employee.terminationDate);
                  console.log($scope.date);
             // $scope.employee.terminationDate= new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1);
             // console.log($scope.employee.terminationDate);

             $scope.updateBankCodes($scope.employee.bankCode);
         
         

              });
             // $scope.employee=CasualsService.get({id:id}); 

      
            }


    $scope.loadEmployees = function () {
            $scope.employees=CasualsService.query();
          

     }

   $rootScope.$on("CallLoadEmployees", function(){
             $scope.loadEmployees();
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


  $http.get(jadaApiUrl+'api/paymode').success(function(data) {
                $scope.paymodes = data;
                // console.log($scope.paymodes);

              });

  $http.get(jadaApiUrl+'api/bankbranchcode').success(function(data) {
                $scope.bankcodes = data;
                // console.log($scope.bankcodes)

              });



  $scope.updateBankCodes=function(code){
    console.log(code);
  $http.get(jadaApiUrl+'api/bankbranchname/'+code).success(function(data) {
                $scope.bankBranchNameList = data;
                // console.log($scope.bankcodes)

              });    
    // $scope.bankBranchName=[];
    // for(var r=0;r<$scope.bankcodes.length;r++){
    //   if($scope.bankcodes[r].bankCode==id){
    //     $scope.bankBranchName.push($scope.bankcodes[r]);
     
    //   }

    

      // console.log($scope.bankBranchName);
    // }

    
  }



  $scope.populateBankName=function(id){
      $scope.bankName=[];


    for(var r=0;r<$scope.bankcodes.length;r++){
      if($scope.bankcodes[r].bankBranchCode==id){
        $scope.empMaster.bankName=$scope.bankcodes[r].bankName;

       
      }

    }

    
  }




  $scope.updateBankName=function(id){
      $scope.bankName=[];


    for(var r=0;r<$scope.bankcodes.length;r++){
      if($scope.bankcodes[r].bankBranchCode==id){
        $scope.employee.bankName=$scope.bankcodes[r].bankName;

       
      }
    }

    
  }

  $http.get(jadaApiUrl+'api/Casual').success(function(data) {
                $scope.points = data;

              });

         $scope.empMaster= new CasualsService();
              $scope.submitEmpMaster = function() {
                $scope.empMaster.$save().then(function(data){
                  var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                     $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                      $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
      
              }
                    $scope.loadEmployees();

                },
                 function() {
                  $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
               
          };

           $scope.delete= function (employee) {
              employee.$remove().then(function () {
               $scope.loadEmployees();

              });
              }


                 
              $scope.updateEmpMaster=function(employee){
                 var emp=new CasualsService(employee);
               emp.$update().then(function(data){
                   var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                     $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
                        $scope.employee=CasualsService.get({id:id}); 
              }else{
             
                      $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
      
              }
                       $scope.loadEmployees();
              },
                function() {
                 $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
            
                };
          


         $scope.departments = [];
         $scope.selectDepartments= function() {
             $rootScope.$emit("CallLoadDepartment", {});
            };


      $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'create-casuals.html',
                controller: ModalOpenInstanceCtrl,
                size: size
              });
            }


    $scope.edit = function(point) {
      
        var modalInstance = $uibModal.open({
          templateUrl: 'edit-casual.html',
          controller: ModalInstanceCtrl,
          resolve: {
             point: function () {
               return point;
             }
           }        
         
        });
      };

               ModalOpenInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','CasualsService'];
            function ModalOpenInstanceCtrl($scope,$rootScope, $uibModalInstance, CasualsService) {
      

              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
              
               $scope.submitcasual=function(Casualform) {
                $scope.ppoint=new CasualsService(Casualform);
             $scope.ppoint.$save().then(function(data){
            var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                      $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                   $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
            $rootScope.$emit("CallParentMethod", {});
             $scope.ppointReset(Casualform);
         
           },
            function() {
                $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
   
            };


        
            $scope.ppointReset=function(leavetypesform){
               $scope.leavetypesform={};
              $scope.ppoint="";
              leavetypesform.$setPristine();
              };


             $scope.CloseCasual=function(ppoint) {
              var saveppoint= new CasualsService(ppoint);
           saveppoint.$save().then(function(data){
           
            $rootScope.$emit("CallParentMethod", {});
            $scope.ok();
           },
            function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
   
            };
           
            }

            ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','CasualsService','point'];
            function ModalInstanceCtrl($scope,$rootScope, $uibModalInstance, CasualsService,point) {
              $scope.point=point;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
                  $scope.updateCasual=function(point){

                
               point.$update().then(function(){
                        $scope.point=point;
                        console.log(point);
                     $rootScope.$emit("CallParentMethod", {});
              });
            
                };

           
            }            


          }
      }

  })();

