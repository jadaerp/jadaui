



/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('FinancialYearController', FinancialYearController);

    FinancialYearController.$inject = ['$scope','$http', '$rootScope','$uibModal','financialYearService','financialPeriodService','$stateParams', '$state','jadaApiUrl'];
    function FinancialYearController($scope,$http, $rootScope, $uibModal, financialYearService,financialPeriodService,$stateParams, $state,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

 var SuccessMsg;
 var errorMsg;

$scope.periods=financialPeriodService.query();



   $scope.loadPeriods = function () {
   $scope.periods=financialPeriodService.query();

   }

 $rootScope.$on("CallLoadPeriods", function(){
           $scope.loadPeriods();
        });


  $scope.newFinancialyear= function () {
    // $scope.buttonText="processing";
    $scope.currentclass='whirl ringed';
    $scope.buttonprocess=true;
      $http.post(jadaApiUrl+'api/financialyear').success(function(){

    $rootScope.$emit("CallLoadPeriods", {});
 $scope.buttonText="Adding";
                  },function(err){
            $scope.buttonText="failed";
            }).finally(function(){
              $scope.currentclass='process';
            $scope.buttonText="process";
            });
            };



$scope.months = [];
$scope.selectedMonth = {};

$scope.loadMonths = function() {
  if ($scope.months.length == 0) {
    $scope.months = [{
      id:1,
      name: 'JANUARY'
    }, {
      id:2,
      name: 'FEBRUAY'
    }, {
      id:3,
      name: 'MARCH'
    },
     {
      id:4,
      name: 'APRIL'
    },
     {
      id:5,
      name: 'MAY'
    },
     {
      id:6,
      name: 'JUNE'
    },
     {
      id:7,
      name: 'JULY'
    },
     {
      id:8,
      name: 'AUGUST'
    },
     {
      id:9,
      name: 'SEPTEMBER'
    },
     {
      id:10,
      name: 'OCTOBER'
    },
     {
      id:11,
      name: 'NOVEMBER'
    },
     {
      id:12,
      name: 'DECEMBER'
    }];
  }
}




  $scope.delete= function (period) {
period.$remove().then(function () {
$scope.loadPeriods();
});
}



          
  


    


  $scope.addFinancialYear = function(size) {
     
            var modalInstance = $uibModal.open({
              templateUrl: 'newFYear.html',
              controller: ModalOpenFYearInstanceCtrl,
              size: size
            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
    };





 


          ModalOpenFYearInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','financialYearService'];
          function ModalOpenFYearInstanceCtrl($scope,$rootScope, $uibModalInstance, financialYearService) {
          
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };
            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            $scope.financialyear=new financialYearService();
             $scope.submitYear=function() {
          $scope.financialyear.$save().then(function(data){
            var response=angular.fromJson(data);
          
            if(response.Status=="1"){
                    $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
                   
                   $scope.SuccessMsg=false;
               
                   $scope.errorMsg=response.Message;
              // vm.auth=true;
            }
              $rootScope.$emit("CallLoadPeriods", {}); 
          }, 
          function() {
                 $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
          };

          //     $scope.submitClosePeriod=function() {
          // $scope.period.$save().then(function(){
            
          //     $rootScope.$emit("CallLoadPeriods", {}); 
          //        $scope.ok();
          // }, 
          // function() {
          //        $scope.SuccessMsg=false;
          //        $scope.errorMsg = 'Server Request Error';
          //       });
    
          // };
         
          }
        }
    }

})();
