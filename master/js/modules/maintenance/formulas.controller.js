
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('FormulasController', FormulasController);

      FormulasController.$inject = ['$scope','$http', '$rootScope','$uibModal','formulasService','$stateParams', '$state','jadaApiUrl'];
      function FormulasController($scope, $http,$rootScope, $uibModal, formulasService,$stateParams, $state,jadaApiUrl) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

   var SuccessMsg;
   var errorMsg;

   $scope.formulas=formulasService.query();



    $scope.loadFormulas = function () {
       $http.get(jadaApiUrl+'api/formula').success(function(data) {
                 $scope.formulas = data;
           

              });
  // $scope.formulas=formulasService.query();
     }
     console.log($scope.formulas);

   $rootScope.$on("CallLoadFormulas", function(){
             $scope.loadFormulas ();
          });


          $scope.delete= function (formula) {
                    formula.$remove().then(function () {
                    $scope.loadFormulas ();
              });
              }



  $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
                 $scope.pcodes = data;
           

              });
            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'addFormulas.html',
                controller: ModalOpenFormulaInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };





  $scope.show = function(formula) {
    
        var modalInstance = $uibModal.open({
          templateUrl: 'editFormulas.html',
          controller: ModalInstanceCtrl,
          resolve: {
             formula: function () {
               return formula;
             }
           }        
        
        });
      };
      

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenFormulaInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','formulasService'];
            function ModalOpenFormulaInstanceCtrl($scope, $rootScope,$uibModalInstance, formulasService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.formula=new formulasService();
               $scope.submitFormula=function(formulaform) {
            $scope.formula.$save().then(function(data){
              var response=angular.fromJson(data);
            
              if(response.Status=="1"){
                $scope.errorMsg=false;
                      $scope.SuccessMsg =response.Message;
              }else{
             
                 $scope.SuccessMsg=false;
                     $scope.errorMsg=response.Message;
             
              }
              $rootScope.$emit("CallLoadFormulas", {});
                $scope.formulaReset(formulaform);

            },
             function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
       
            };


    $scope.formulaReset=function(formulaform){
               $scope.formulaform={};
              $scope.formula="";
              formulaform.$setPristine();
              };
                $scope.closeFormula=function(formulaform) {
                  var saveformula= new formulasService(formulaform);
           saveformula.$save().then(function(){
              $rootScope.$emit("CallLoadFormulas", {});
              $scope.ok();

            },
              function() {
               $scope.SuccessMsg=false;
                   $scope.errorMsg = 'Server Request Error';
                  });
       
            };
           
            }


               ModalInstanceCtrl.$inject = ['$scope', '$rootScope','$uibModalInstance','formulasService','formula'];
            function ModalInstanceCtrl($scope, $rootScope,$uibModalInstance, formulasService,formula) {
            $scope.formula=formula;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              
             $scope.updateFormula=function(furmula){

               furmula.$update().then(function(){
                     $rootScope.$emit("CallLoadFormulas", {});
              });
            
                };
           
            }
          }
      }

  })();