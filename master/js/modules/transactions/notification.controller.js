
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

 
           
$scope.approvedResource = $resource(jadaApiUrl+'api/approvedpayrolltransaction');
$scope.approve=$scope.approvedResource.get({});

$scope.rejectedResource = $resource(jadaApiUrl+'api/rejectedpayrolltransaction');
 $scope.rejectedgpayroll=$scope.rejectedResource.get({});

      $scope.pendingleaves=LeaveApprovalService.query();
    

           

// $http.get(jadaApiUrl+'api/approvedpayrolltransaction').success(function(data) {
//                     $scope.approvedgpayroll=data;
                 
//                   });




       $scope.approvedpayroll=function () {
      var count = 0;

      angular.forEach($scope.approve, function(value, key) {
        if(key=="status" &&value=="1"){
          count++
  
        }
       
      }
      );
      return count;


      }








      // $http.get(jadaApiUrl+'api/rejectedpayrolltransaction').success(function(data) {
      //               $scope.rejectedgpayroll =data;

      //           console.log($scope.rejectedgpayroll);
      //             });




       $scope.rejectedpayroll=function () {
      var count = 0;

      angular.forEach($scope.rejectedgpayroll, function(value, key) {
        if(key=="status" &&value=="2"){
          count++

        }
       
      }
      );
      return count;


      }






                 $http.get(jadaApiUrl+'api/pendingpayrolltransaction').success(function(data) {
                    $scope.pendingpayrolldata=data;
                 
                  });


       $scope.pendingpayroll=function () {
      var count = 0;

      angular.forEach($scope.pendingpayrolldata, function(value, key) {
        if(key=="status" &&value=="0"){
          count++

        }
       
      }
      );
      return count;


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
      

      }
              }
          }

      })();