
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.transactions')
        .controller('EmployeePostingController', EmployeePostingController);

    EmployeePostingController.$inject = ['$scope','$http', '$rootScope','$uibModal','employeePostingService','GetemployeeService', '$state','$resource','jadaApiUrl'];
    function EmployeePostingController($scope,$http, $rootScope, $uibModal, employeePostingService,GetemployeeService, $state,$resource,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

 var SuccessMsg;
 var errorMsg;
  

     
$http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
          $scope.postingtrans={};
          $scope.currentPeriod=data.data;
    $scope.currentperiodId=$scope.currentPeriod.id;
    console.log('currentperiod')
    console.log($scope.currentperiodId)

      $scope.postingtrans.periodId=$scope.currentperiodId;
      $scope.period_description=$scope.currentPeriod.month+ ' '+$scope.currentPeriod.year;
     });

       $scope.searchEmployee=function(postingtrans) {
              $scope.curPage = 0;
             $scope.pageSize = 1;   
             console.log(postingtrans);

          if(postingtrans.periodId!=null && postingtrans.periodId!=""){
            $rootScope.employeePostedId = postingtrans.employeeId;
            $rootScope.periodPostedId =postingtrans.periodId;
                  var employeeId=postingtrans.employeeId;
          var periodId=postingtrans.periodId;
          
          console.log("period - "+periodId+" employee - "+employeeId);
          $http.get(jadaApiUrl+'api/payrollpostingReport/'+periodId+'/'+employeeId).success(function(data) {
            $scope.payrollpostingTransaction=data;
     
          console.log($scope.payrollpostingTransaction);
               $scope.numberOfPages = function() {
        return Math.ceil($scope.payrollpostingTransaction.length / $scope.pageSize);
      };

             });


          }
        
         };


$scope.postingData=function(){

        $scope.curPage = 0;
        $scope.pageSize = 1;      


          $http.get(jadaApiUrl+'api/payrollpostingReport/').success(function(data) {
              $scope.payrollpostingTransaction=data;
         // $scope.transactions=data.payrollCodeReportList;
         // $scope.alltransactions=data.payrollTransactionList;
              console.log($scope.payrollpostingTransaction);
     $scope.numberOfPages = function() {
        return Math.ceil($scope.payrollpostingTransaction.length / $scope.pageSize);
      };


             });

  
}
$scope.postingData();


       


     





   $scope.reloadtrans=function(postingtrans) {
         
      var employeeId=postingtrans.employeeId;
          var periodId=postingtrans.periodId;
          

           $http.get(jadaApiUrl+'api/payrollpostingReport/'+periodId+'/'+employeeId).success(function(data) {
            $scope.payrollpostingTransaction=data;
     
          console.log(postingtrans);
      
             });

     
        
         };
          $scope.loadTransactions=function () {
          var employeeId=$rootScope.employeePostedId;
          var periodId=$rootScope.periodPostedId;
          console.log("period - "+periodId+" employee - "+employeeId);
          $http.get(jadaApiUrl+'api/payrollpostingReport/'+employeeId+'/'+periodId).success(function(data) {
              $scope.oneUser = data;

              $scope.transactions=data.payrollCodeReportList;
              console.log(  $scope.transactions);


            });
        }

 $rootScope.$on("CallLoadTransactions", function(){
           $scope.loadTransactions ();
        });


    $http.get(jadaApiUrl+'api/period').success(function(data) {
              $scope.periods = data;

            });

$http.get(jadaApiUrl+'api/department').success(function(data) {
              $scope.departments = data;

            });

$http.get(jadaApiUrl+'api/employee/active').success(function(data) {
            // $scope.postingtrans={};
              $scope.employees=data;
              var empId=$scope.employees[0].id;
              $scope.postingtrans.employeeId=empId;
           console.log('hapa');
             console.log($scope.employees[0].id);


          
            });


   $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
               $scope.pcodes = data;
         

            });

         $scope.codeChange=function(id){
              for(var r=0;r<$scope.pcodes.length;r++){
                if(id==$scope.pcodes[r].id){
                  $scope.description=$scope.pcodes[r].description;
                }

              }

            }



$scope.populateeTransactionData=function(id){
    $scope.posting=[];
for(var r=0;r< $scope.periods.length;r++){
    if( $scope.periods[r].id==id){
      $scope.periodId=$scope.periods[r].id;  
    }
  }

  
}


        $scope.delete= function (transaction) {
          console.log("transaction");
          console.log(transaction);
             var deletetransaction= new employeePostingService(transaction);
                  deletetransaction.$delete().then(function () {
                 $state.reload();
            });
            }
          
          $scope.open = function (employeeinfo) {

            var modalInstance = $uibModal.open({
              templateUrl: 'addTransactions.html',
              controller: ModalOpenFormulaInstanceCtrl,
          
              resolve: {
           employeeinfo: function () {
             return employeeinfo;
           }
         }

            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };

             $scope.openPayslip = function (employeeinfo) {

            var modalInstance = $uibModal.open({
              templateUrl: 'viewPayslip.html',
              controller: ViewTransactionInstanceCtrl,
              // size:'lg',
              resolve: {
           employeeinfo: function () {
             return employeeinfo;
           }
         }

            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };






$scope.show = function(trans) {
      // $scope.x = x;
      var modalInstance = $uibModal.open({
        templateUrl: 'editTransaction.html',
        controller: ModalInstanceCtrl,
        resolve: {
           trans: function () {
             return trans;
           }
         }        
        // scope : $scope
      });
    };
    



 


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenFormulaInstanceCtrl.$inject = ['$scope', '$http','$rootScope','$uibModalInstance','employeePostingService','jadaApiUrl','employeeinfo'];
          function ModalOpenFormulaInstanceCtrl($scope, $http,$rootScope,$uibModalInstance, employeePostingService,jadaApiUrl,employeeinfo) {

         $scope.transactionposting=employeeinfo;
          $scope.transactionposting.periodId=employeeinfo.period;
       $scope.transactionposting.employeeId=employeeinfo.id;
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

            
             $scope.submitTransaction=function(transactionposting) {
      var usertransactionposting=new employeePostingService(transactionposting);

          usertransactionposting.$save().then(function(data){
             var response=angular.fromJson(data);
          
            if(response.Status=="1"){
              $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
              
                     $scope.transactionposting.payrollCodeId=' ';
                     $scope.transactionposting.amount=' ';
            }else{
           
               $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
           
            }
           $state.reload();

          }, 
          function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
     
          };


            $scope.saveCloseTransaction=function(transactionposting) {
                 var usertransactionposting=new employeePostingService(transactionposting);
         usertransactionposting.$save().then(function(){
          $scope.transactionposting.payrollCodeId=' ';
                     $scope.transactionposting.amount=' ';
            $state.reload();
            $scope.ok();

          },
           function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
     
          };

       
         
          }



              // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ViewTransactionInstanceCtrl.$inject = ['$scope', '$http','$rootScope','$uibModalInstance','employeePostingService','jadaApiUrl','employeeinfo'];
          function ViewTransactionInstanceCtrl($scope, $http,$rootScope,$uibModalInstance, employeePostingService,jadaApiUrl,employeeinfo) {

    
      
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

console.log(employeeinfo.periodId)
console.log(employeeinfo.employeeId)

          if(employeeinfo.periodId!=null && employeeinfo.periodId!=""){
    
           var employeeId=employeeinfo.employeeId;
           var period=employeeinfo.periodId;
     
          $http.get(jadaApiUrl+'api/payslipreport//'+period+'/'+employeeId).success(function(data) {
                $scope.persons= data;

                 $scope.message="hellow period";
      console.log('////hapa');
              console.log($scope.persons);


            });

          }
       
         
          }
            

             ModalInstanceCtrl.$inject = ['$scope', '$http', '$rootScope','$uibModalInstance','employeePostingService','trans','jadaApiUrl'];
          function ModalInstanceCtrl($scope,$http, $rootScope,$uibModalInstance, employeePostingService,trans,jadaApiUrl) {
          // $scope.transaction=trans;
          var id=trans.id;
          console.log(id);

          
                $scope.transaction=trans;
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            
       $scope.transaction= employeePostingService.get({id:id});
           $scope.updateTransaction=function(transaction){
      
            transaction.$update().then(function(){
                 $state.reload();
            });
          
              };


         
          }
        }
    }

})();