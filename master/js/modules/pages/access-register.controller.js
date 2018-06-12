/**=========================================================
 * Module: access-register.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$scope','$http', '$state', 'register'];
    function RegisterFormController($scope,$http, $state,register) {
      // $scope.message=register.query();
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.auth=false;
             vm.account= new register();
  //     $scope.submitCompany = function() {
  //       $scope.company.$save(function(){
  //           console.log($scope.company.Company_Name);});
  // }
          vm.register = function() {
            vm.authMsg = '';
               vm.error='';

            if(vm.registerForm.$valid) {

              vm.account.$save(function(data){

            var response=angular.fromJson(data);
            console.log(response.Message);
            vm.authMsg=response.Message;
            if(response.Status=="1"){
                    vm.authMsg =response.Message;
            }else{
              vm.auth=false;
               
                   vm.error=response.Message;
              // vm.auth=true;
            }
            ;},
            function(){
              vm.error = 'Server Request Error';
            });

              // $http
              //   .post('api/account/register', {email: vm.account.email, password: vm.account.password})
              //   .then(function(response) {
              //     // assumes if ok, response is an object with some data, if not, a string with error
              //     // customize according to your api
              //     if (!response.account ) {
              //       vm.authMsg = response;
              //     }else{
              //       $state.go('app.dashboard');
              //     }
              //   }, function() {
              //     vm.authMsg = 'Server Request Error';
              //   });
            }
            // else {
            //   // set as dirty if the user click directly to login so we show the validation messages
            //   /*jshint -W106*/
            //   vm.registerForm.password.$dirty = true;
            //   vm.registerForm.account_password.$dirty = true;
            //   // vm.registerForm.account_agreed.$dirty = true;
              
            // }
          };
        }
    }
})();
