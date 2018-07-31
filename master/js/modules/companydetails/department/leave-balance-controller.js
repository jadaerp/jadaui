

      /**=========================================================
       * Module: modals.js
       * Provides a simple way to implement bootstrap modals from templates
       =========================================================*/
      (function() {
          'use strict';

          angular
              .module('app.bootstrapui')
              .controller('LeaveBalanceController', LeaveBalanceController);

         LeaveBalanceController.$inject = ['$scope','$rootScope', '$http','$uibModal','LeaveBalanceService','$stateParams', '$state','jadaApiUrl'];
          function LeaveBalanceController($scope, $rootScope,$http, $uibModal, LeaveBalanceService,$stateParams, $state,jadaApiUrl) {
              var vm = this;

              activate();

              ////////////////

              function activate() {

       var SuccessMsg="nothing";
       var errorMsg;

        $http.get(jadaApiUrl+'api/leaveType/').then(function(data) {
    
          $scope.leaveTypeData=data.data;
     

 
     });       




        $scope.leaveBalance={};
$http.get(jadaApiUrl+'api/currentperiod').then(function(data) {
    
          $scope.currentPeriodData=data.data;
    $scope.periodId=$scope.currentPeriodData.period;
    $scope.leaveBalance.periodId=$scope.periodId;

        $http.get(jadaApiUrl+'api/leaveBalance/'+$scope.periodId).then(function(data) {
    
          $scope.leaveBalanceData=data.data;
     

 
     });    


     });




$scope.filterLeaveBalance=function(leaveBalance){
  console.log($scope.periodId);



        $http.get(jadaApiUrl+'api/leavebalance/'+$scope.periodId+'/'+leaveBalance.leaveTypeId).then(function(data) {
    
          $scope.leaveBalanceData=data.data;


 
     });

}
$http.get(jadaApiUrl+'api/employee').success(function(data) {
              $scope.employees = data;
          
            });
                $http.get(jadaApiUrl+'api/period').success(function(data) {
                $scope.periodData = data;
            
              });
      
         $scope.loadLeaveBalances = function () {
$http.get(jadaApiUrl+'api/leaveBalance/'+$scope.periodId).success(function(data) {
              $scope.leaveBalanceData = data;
              console.log($scope.leaveBalances);
          
            });

         }

       $rootScope.$on("CallLoadLeaveBalances", function(){
                 $scope.loadLeaveBalances();
              });




        $scope.delete= function (leaveBalance) {
          var leaveBalanceService=new LeaveBalanceService(leaveBalance);
      leaveBalanceService.$delete().then(function () {
          $scope.loadLeaveBalances();
      });
      }


                $scope.open = function (size) {

                  var modalInstance = $uibModal.open({
                    templateUrl: 'addLeaveBalance.html',
                    controller: ModalOpenLeaveInstanceCtrl,
                    size: size
                  });





                  var state = $('#modal-state');
                  modalInstance.result.then(function () {
                    state.text('Modal dismissed with OK status');
                  }, function () {
                    state.text('Modal dismissed with Cancel status');
                  });
                };






      $scope.show = function(leaveB) {

            // $scope.x = x;
            var modalInstance = $uibModal.open({
              templateUrl: 'editLeave.html',
              controller: ModalInstanceCtrl,
              resolve: {
                 leaveB: function () {
                   return leaveB;
                 }
               }        
              // scope : $scope
            });
          };




       


                // Please note that $uibModalInstance represents a modal window (instance) dependency.
                // It is not the same as the $uibModal service used above.

                ModalOpenLeaveInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','LeaveBalanceService'];
                function ModalOpenLeaveInstanceCtrl($scope, $rootScope,$uibModalInstance, LeaveBalanceService) {
                

                  $scope.ok = function () {
                    $uibModalInstance.close('closed');
                  };

                  $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                  };
                  
                     

                 $scope.submit=function(leave,leaveForm) {
                  
                  console.log(leave);
                  var leaveForm=new LeaveBalanceService(leave);
                  
                 leaveForm.$save().then(function(data){

                   var response=angular.fromJson(data);
                  console.log($scope.leave);
                  // $scope.authMsg=response.Message;
                  if(response.Status=="1"){
                           $scope.errorMsg=false;
                          $scope.SuccessMsg =response.Message;
                  }else{
                 
                        $scope.SuccessMsg=false;
                         $scope.errorMsg=response.Message;
                
                  }
                   $rootScope.$emit("CallLoadLeaveBalances", {});
                    $scope.leaveBalanceReset(leave,leaveForm);

                 },
                 function() {
                      $scope.SuccessMsg=false;
                       $scope.errorMsg = 'Server Request Error';
                      });
          
                }

                 $scope.leaveBalanceReset=function(paypointform,leaveForm){
                   $scope.paypointform={};
                  
                  leaveForm.$setPristine();
                  };
                   $scope.submitAndClose=function(leave) {
                    var saveleave=new LeaveBalanceService(leave);
                 saveleave.$save().then(function(){
                   $rootScope.$emit("CallLoadLeaveBalances", {});
                     // $scope.ok();

                 },
                  function() {
                      $scope.SuccessMsg=false;
                       $scope.errorMsg = 'Server Request Error';
                      });
          
                }

              }

                   ModalInstanceCtrl.$inject = ['$scope','$http', '$rootScope','$uibModalInstance','LeaveBalanceService','leaveB','jadaApiUrl','$resource'];
                function ModalInstanceCtrl($scope, $http,$rootScope,$uibModalInstance,LeaveBalanceService,leaveB,jadaApiUrl,$resource) {
                  console.log(leaveB);
                  $scope.leavebalances=leaveB;
                  console.log($scope.loadLeaveBalances);
       var id=leaveB.id;
                $scope.leaveBalance=LeaveBalanceService.get({id:id});
              
         

                  

                  $scope.ok = function () {
                    $uibModalInstance.close('closed');
                  };

                  $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                  };
                  
                  

                     $scope.update=function(leave){
                      console.log(leave);
                      var updateleave=new LeaveBalanceService(leave)
                 updateleave.$update().then(function(data){
                           var response=angular.fromJson(data);
                  console.log($scope.leave);
                  // $scope.authMsg=response.Message;
                  if(response.Status=="1"){
                           $scope.errorMsg=false;
                          $scope.SuccessMsg =response.Message;
                           $scope.leave=LeaveBalanceService.get({id:id});
                  }else{
                 
                        $scope.SuccessMsg=false;
                         $scope.errorMsg=response.Message;
                
                  }
                   $rootScope.$emit("CallLoadLeaveBalances", {});
                  }, function() {
                      $scope.SuccessMsg=false;
                       $scope.errorMsg = 'Server Request Error';
                      });

                      };

                }
              }
          }

      })();
