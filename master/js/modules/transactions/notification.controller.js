
      /**=========================================================
       * Module: modals.js
       * Provides a simple way to implement bootstrap modals from templates
       =========================================================*/
      (function() {
          'use strict';

          angular
              .module('app.transactions')
              .controller('jadaNotificationController', jadaNotificationController);

          jadaNotificationController.$inject = ['$scope','$http', '$rootScope','$uibModal', '$state','$resource','jadaApiUrl','LeaveApprovalService','PayrollApprovalService'];
          function jadaNotificationController($scope,$http, $rootScope, $uibModal, $state,$resource,jadaApiUrl,LeaveApprovalService,PayrollApprovalService) {
              var vm = this;

              activate();

              ////////////////

              function activate() {

       var SuccessMsg;
       var errorMsg;

 

      $scope.pendingleaves=LeaveApprovalService.query();
    

           




















                 $http.get(jadaApiUrl+'api/pendingpayrolltransaction').success(function(data) {
                    $scope.pendingpayrolldata=data;
                 
                  });

                  $http.get(jadaApiUrl+'api/pendingapprovalcasualtransaction').success(function(data) {
                    $scope.pendingapprovalcasualdata=data;
                 
                  });



                  $http.get(jadaApiUrl+'api/pendingpaymentcasualtransaction').success(function(data) {
                    $scope.pendingpaymentcasualdata=data;
                 
                  });

                  $http.get(jadaApiUrl+'api/advancetransaction').success(function(data) {
                    $scope.advancedata=data;
                 
                  });


                  $scope.pendingapprovalcasualcount=function(){
                    var c=0;
                    angular.forEach($scope.pendingapprovalcasualdata, function(value, key) {
                      
                        c++
                    });
                      return c;

                      
                  }
                  $scope.pendingpaymentcasualcount=function(){
                    var c=0;
                    angular.forEach($scope.pendingpaymentcasualdata, function(value, key) {
                      
                        c++
                    });
                      return c;

                      
                  }                  

                  $scope.advancecount=function(){
                    var c=0;
                    angular.forEach($scope.advancedata, function(value, key) {
                      
                        c++
                    });
                      return c;

                      
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
        var total=Number($scope.leavenotification())+Number($scope.advancecount())+Number($scope.pendingpaymentcasualcount())+Number($scope.pendingapprovalcasualcount());
        return total;
      

      }
              }
          }

      })();