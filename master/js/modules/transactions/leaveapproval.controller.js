
      /**=========================================================
       * Module: modals.js
       * Provides a simple way to implement bootstrap modals from templates
       =========================================================*/
      (function() {
          'use strict';

          angular
              .module('app.transactions')
              .controller('LeaveApprovalController', LeaveApprovalController);

          LeaveApprovalController.$inject = ['$scope','$http', '$rootScope','$uibModal', '$state','$resource','jadaApiUrl','LeaveApprovalService','PayrollApprovalService'];
          function LeaveApprovalController($scope,$http, $rootScope, $uibModal, $state,$resource,jadaApiUrl,LeaveApprovalService,PayrollApprovalService) {
              var vm = this;

              activate();

              ////////////////

              function activate() {

       var SuccessMsg;
       var errorMsg;

           
      $scope.pendingleaves=LeaveApprovalService.query();
      console.log($scope.pendingleaves);

           

      var currentperiod=0

                 $http.get(jadaApiUrl+'api/approvedpayrolltransaction').success(function(data) {
                    $scope.approvedgpayroll=data;
                 
                  });


       $scope.approvedpayroll=function () {
      var count = 0;

      angular.forEach($scope.approvedgpayroll, function(value, key) {
        if(key=="status" &&value=="1"){
          count++
       console.log(key + ': ' + value);
        }
       
      }
      );
      return count;


      }





      $http.get(jadaApiUrl+'api/rejectedpayrolltransaction').success(function(data) {
                    $scope.rejectedgpayroll =data;

                console.log($scope.rejectedgpayroll);
                  });



       $scope.rejectedpayroll=function () {
      var count = 0;

      angular.forEach($scope.rejectedgpayroll, function(value, key) {
        if(key=="status" &&value=="2"){
          count++
       console.log(key + ': ' + value);
        }
       
      }
      );
      return count;


      }


                 $http.get(jadaApiUrl+'api/pendingpayrolltransaction').success(function(data) {
                    $scope.pendingpayrolldata=data;
                   console.log('pending');
                    console.log($scope.pendingpayroll)
                  });


       $scope.pendingpayroll=function () {
      var count = 0;

      angular.forEach($scope.pendingpayrolldata, function(value, key) {
        if(key=="status" &&value=="0"){
          count++
       console.log(key + ': ' + value);
        }
       
      }
      );
      return count;


      }




       $scope.loadPendingpayroll=function () {
    
                 $http.get(jadaApiUrl+'api/pendingpayrolltransaction').success(function(data) {
                    $scope.pendingpayrolldata=data;
                   console.log('pending');
                    console.log($scope.pendingpayroll)
                  });
       }


       $scope.leavenotification = function () {
      var count = 0;
      angular.forEach($scope.pendingleaves, function (item) {
      if (!item.isApproved) { count++ }
      });
      return count;


      }

      

         $scope.loadPendingLeaves = function () {
      $scope.pendingleaves=LeaveApprovalService.query();

         }

       $rootScope.$on("CallLoadPendingLeaves", function(){
                 $scope.loadPendingLeaves();
              });




      $scope.totalNotification=function(){
        var total=$scope.leavenotification()+ $scope.pendingpayroll()+$scope.rejectedpayroll()+$scope.approvedpayroll();
        return total;
        console.log(here);
        console.log(total);

      }


      $scope.show = function(leave) {
        console.log("leave");
        console.log(leave);
            // $scope.x = x;
            var modalInstance = $uibModal.open({
              templateUrl: 'leaveapproval.html',
              controller: ModalInstanceCtrl,
              resolve: {
                 leave: function () {
                   return leave;
                 }
               }        
              // scope : $scope
            });
          };
          



       



                   ModalInstanceCtrl.$inject = ['$scope', '$http', '$rootScope','$uibModalInstance','LeaveApprovalService','leave','jadaApiUrl'];
                function ModalInstanceCtrl($scope,$http, $rootScope,$uibModalInstance, LeaveApprovalService,leave,jadaApiUrl) {
                $scope.leave=leave;
                  $scope.ok = function () {
                    $uibModalInstance.close('closed');
                  };

                  $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                  };
                  

                 $scope.approveLeave=function(leave){
                   console.log("approve leave");
                    console.log(leave);
                   leave.$update().then(function(){

                         $rootScope.$emit("CallLoadPendingLeaves", {});
                  });
                
                    };


               
                }
              }
          }

      })();