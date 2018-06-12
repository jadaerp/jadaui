


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.transactions')
        .controller('PayrollApprovalController', PayrollApprovalController);

   PayrollApprovalController.$inject = ['$scope','$http','$rootScope', '$uibModal','PayrollApprovalService','$stateParams', '$state','$timeout','jadaApiUrl','toaster'];
    function PayrollApprovalController($scope,$http, $rootScope,$uibModal, PayrollApprovalService,$stateParams, $state,$timeout,jadaApiUrl,toaster) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


 


     

 $http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
            
         $scope.currentp=data;
        $scope.current=data.data.id;
        console.log($scope.current);
        console.log('data');
       console.log($scope.currentp);
  
            });
           




 $scope.sendforApproval= function (current) {
   var currentperiod=current;
  var  paryroll={periodId:currentperiod, status:"0"};
 
console.log(paryroll);
    $scope.currentclass='whirl ringed';

      var  payrollposting=new PayrollApprovalService(paryroll);
  


            payrollposting.$save().then(function(data){
               $scope.currentclass='process';
              var response=angular.fromJson(data);
            console.log(response.Message);
            // $scope.authMsg=response.Message;
            if(response.Status=="1"){
                    $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
            $scope.currentclass='process';
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;

              // vm.auth=true;
            } 
           $state.reload()

            }, function() {
               $scope.currentclass='process';
               $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });

 }







     $scope.buttonText="process";

 $scope.payrollApproval= function (current) {
   var currentperiod=current;
  var  paryroll={periodId:currentperiod, status:"1"};
 
console.log(paryroll);
    $scope.currentclass='whirl ringed';

      var  payrollposting=new PayrollApprovalService(paryroll);
  


            payrollposting.$update().then(function(data){
               $scope.currentclass='process';
              var response=angular.fromJson(data);
            console.log(response.Message);
            // $scope.authMsg=response.Message;
            if(response.Status=="1"){
                    $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
            $scope.currentclass='process';
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;

              // vm.auth=true;
            }
           
$state.reload()
            }, function() {
               $scope.currentclass='process';
               $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });

 }


  $scope.payrollReject= function (current) {
   var currentperiod=current;
  var  paryroll={periodId:currentperiod, status:"2"};
 
console.log(paryroll);
    $scope.rejectclass='whirl ringed';

      var  payrollposting=new PayrollApprovalService(paryroll);
  


            payrollposting.$update().then(function(data){
               $scope.rejectclass='process';
              var response=angular.fromJson(data);
            console.log(response.Message);
            // $scope.authMsg=response.Message;
            if(response.Status=="1"){
                    $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
            $scope.rejectclass='process';
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;

              // vm.auth=true;
            }
           $state.reload()

            }, function() {
               $scope.rejectclass='process';
               $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });

 }
 



          
          









 





      
        }
    }

})();
