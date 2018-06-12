


  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('CompanyRegController', CompanyRegController);

      CompanyRegController.$inject = ['$http','$scope', '$rootScope','$uibModal','companyService','$stateParams', '$state','$localStorage'];
      function CompanyRegController($http,$scope, $rootScope,$uibModal, companyService,$stateParams, $state,$localStorage) {
          var vm = this;

          activate();

          ////////////////

          function activate() {



   var SuccessMsg;
   var errorMsg;


   $scope.company=companyService.get({ID:1});

  console.log( $scope.company);



    $scope.loadCompany = function () {
     
   $scope.company=companyService.get({ID:1});
     }

   $rootScope.$on("CallLoadCompany", function(){
             $scope.loadCompany ();
          });

            
            vm.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'CompInfoContent.html',
                controller: ModalInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };





  $scope.show = function(EditCompany) {
    console.log("EditCompany");
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'GeneralCompanyEdit.html',
          controller: ModalInstanceCtrl,
          resolve: {
             EditCompany: function () {
               return EditCompany;
             }
           }        
          // scope : $scope
        });
      };
      
      



            
   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','companyService','EditCompany'];
            function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, companyService,EditCompany) {
            $scope.company=EditCompany;
            console.log(EditCompany);
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            

    
             $scope.EditGenCompany=function(company){
               company.$update().then(function(data){
                var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                    $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                     $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
                // vm.auth=true;
              }
                     $rootScope.$emit("CallLoadCompany", {});
              },
               function() {
                   $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
            
                };
           
            }
          }
      }

  })();
