


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('FinancialPeriodsController', FinancialPeriodsController);

    FinancialPeriodsController.$inject = ['$scope','$http','jadaApiUrl', '$rootScope','$uibModal','financialPeriodService','$stateParams', '$state'];
    function FinancialPeriodsController($scope,$http,jadaApiUrl, $rootScope, $uibModal, financialPeriodService,$stateParams, $state) {
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


$scope.months = [];
$scope.selectedMonth = {};

$scope.loadMonths = function() {
  if ($scope.months.length == 0) {
    $scope.months = [{
      id:"1",
      name: 'JANUARY'
    }, {
      id:"2",
      name: 'FEBRUAY'
    }, {
      id:"3",
      name: 'MARCH'
    },
     {
      id:"4",
      name: 'APRIL'
    },
     {
      id:"5",
      name: 'MAY'
    },
     {
      id:"6",
      name: 'JUNE'
    },
     {
      id:"7",
      name: 'JULY'
    },
     {
      id:"8",
      name: 'AUGUST'
    },
     {
      id:"9",
      name: 'SEPTEMBER'
    },
     {
      id:"10",
      name: 'OCTOBER'
    },
     {
      id:"11",
      name: 'NOVEMBER'
    },
     {
      id:"12",
      name: 'DECEMBER'
    }];
  }
}




  $scope.delete= function (period) {
period.$remove().then(function () {
$scope.loadPeriods();
});
}



          
          $scope.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'newFperiods.html',
              controller: ModalOpenFperiodsInstanceCtrl,
              size: size
            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };


$scope.show = function(period) {
      // $scope.x = x;
                // $http.get(jadaApiUrl+'api/period/'+period.id).success(function(data) {
                //         period = data;
                       
                //       });    
      var modalInstance = $uibModal.open({
        templateUrl: 'editFperiods.html',
        controller: ModalInstanceCtrl,
        resolve: {
           period: function () {
             
             return period;
           }
         }        
        // scope : $scope
      });
    };
    



    


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





 


          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenFperiodsInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','financialPeriodService'];
          function ModalOpenFperiodsInstanceCtrl($scope,$rootScope, $uibModalInstance, financialPeriodService) {
          
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };
            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            $scope.period=new financialPeriodService();
             $scope.submitPeriod=function() {
          $scope.period.$save().then(function(data){
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

              $scope.submitClosePeriod=function() {
          $scope.period.$save().then(function(){
            
              $rootScope.$emit("CallLoadPeriods", {}); 
                 $scope.ok();
          }, 
          function() {
                 $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
          };
         
          }


          ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','financialPeriodService','period'];
          function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, financialPeriodService,period) {
          $scope.period=period;
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
         
                $scope.updatePeriods=function(period){
             period.$update().then(function(){
                   $rootScope.$emit("CallLoadPeriods", {});
            });
          
              };
          }


                  ModalOpenFYearInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','financialPeriodService'];
          function ModalOpenFYearInstanceCtrl($scope,$rootScope, $uibModalInstance, financialPeriodService) {
          
            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };
            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
            $scope.year=new financialPeriodService();
             $scope.submitYear=function() {
          $scope.year.$save().then(function(data){
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
