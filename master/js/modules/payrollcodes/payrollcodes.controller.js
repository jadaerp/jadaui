
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('PayrollCodesController', PayrollCodesController);

      PayrollCodesController.$inject =['$scope','$http','$rootScope', '$uibModal','PayrollCodesService','$stateParams', '$state','jadaApiUrl'];
      function PayrollCodesController($scope,$http,$rootScope, $uibModal, PayrollCodesService,$stateParams, $state,jadaApiUrl) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;

  $scope.plist=PayrollCodesService.query();



    $scope.loadPlist = function () {
            $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
                $scope.plist = data;
              });      
          // $scope.plist=PayrollCodesService.query();
     }

   $rootScope.$on("CallloadPlist", function(){
             $scope.loadPlist();
          });
    
            
            $http.get(jadaApiUrl+'api/payrollcodegroup').success(function(data) {
                $scope.pgroups = data;
              });

    $scope.delete= function (code) {
  code.$remove().then(function () {
    $scope.loadPlist();
  // $scope.plist.splice($scope.plist.indexOf(code), 1);
  });
  }


            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'addPCodes.html',
                controller: ModalOpenInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };




    $scope.show = function(code) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'EditPCodes.html',
          controller: ModalInstanceCtrl,
          resolve: {
             code: function () {
               return code;
             }
           }        
          // scope : $scope
        });
      };

      



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.
        

         ModalOpenInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PayrollCodesService'];
            function ModalOpenInstanceCtrl($scope,$rootScope, $uibModalInstance, PayrollCodesService) {
              
              
              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
           $scope.payrollcodes=new PayrollCodesService();
               $scope.submitPayrollCode=function(payrollcodeform) {
            $scope.payrollcodes.$save().then(function(data){
               var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
               $rootScope.$emit("CallloadPlist", {});

            $scope.pcodeReset(payrollcodeform);
            },
            function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
            
          
            };


            $scope.pcodeReset=function(payrollcodeform){
               $scope.payrollcodeform={};
              $scope.payrollcodes="";
              payrollcodeform.$setPristine();
              };

                $scope.submitPayrollCodeClose=function(payrollcodes) {

                  var pcodes=new PayrollCodesService(payrollcodes)
            pcodes.$save().then(function(){
               $rootScope.$emit("CallloadPlist", {});
               $scope.ok();
            },function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
            
          
            };
                
            // console.log('Saving paypoint: ' +$scope.ppoint.code);
           // $scope.points.push(data);
            
           
            }
            ModalInstanceCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance','PayrollCodesService','code'];
            function ModalInstanceCtrl($scope,$rootScope, $uibModalInstance, PayrollCodesService,code) {
              
              $scope.code=code;
             

              $scope.ok = function () {
                $uibModalInstance.close('closed');
                
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
        $scope.updatepayrollcodes=function(code){
   code.$update().then(function(){
                     $rootScope.$emit("CallloadPlist", {});
              });

  };

           
            }
          }
      }

  })();
