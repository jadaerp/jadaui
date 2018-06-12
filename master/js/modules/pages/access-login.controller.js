// /**=========================================================
//  * Module: access-login.js
//  * Demo for login api
//  =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$scope','$http', '$state','$localStorage','jadaApiUrl'];
    function LoginFormController($scope, $http, $state,$localStorage,jadaApiUrl) {

        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

         $scope.formlg={};


  
$scope.buttonText="Login";
// $scope.login=function(){
//   $scope.authMsg = '';
// $scope.buttonText="Logging in. . .";
// authService.login($scope.formlg.userName,  $scope.
// formlg.password).then(function(data, status){
   
// alert(data);

//    // if ( !response.token ) {
//    //             vm.authMsg = 'Incorrect credentials.';
//    //              }else{
//    //              $state.go('app.dashboard');
//    //              }
              

// },function(error,status){
//  $scope.authMsg = 'Server Request Error';
// }).finally(function(){
// $scope.buttonText="Login";
// });
// }


    // $scope.login = function () {
    //                         var env = {
    //                             username:$scope.formlg.username,
    //                             DBName:$scope.formlg.DBName, 
    //                             password:$scope.formlg.password
    //                         };

    //                         $http({
    //                             method: 'POST',
    //                             url: 'http://localhost:9418/jada/login',
    //                             data: env,
    //                             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //                             transformRequest: function(obj) {
    //                               var str = [];
    //                               for(var p in obj)
    //                               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //                               return str.join("&");
    //                             }
    //                         }).
    //                         then(function (data, status, headers, config) {
    //                             $scope.postStatus = 'success: ' + data;
    //                         },
    //                         function (error, status, headers, config) {
    //                             $scope.postStatus = 'error: ' + status;
    //                         });
                            
    //                     }






       $scope.login = function() {
            $scope.authMsg = '';
            $scope.errMsg='';

            if($scope.loginForm.$valid) {

              $http
                .post(jadaApiUrl+'api/login', {username: $scope.formlg.userName, password:$scope.formlg.password})
                .success(function(data){
               $scope.buttonText="Logging in. . .";
                  var response=angular.fromJson(data.response);
                  var userAccount=angular.fromJson(data.userAccount);



                  // alert(response.Message);  
                  if(response.Status=="1"){
                     if (data.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: userAccount.userName, token: data.token ,accountRights:data.accountRights};
                        
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;

                        // execute callback with true to indicate successful login
                      
                    }      
                               
                    $state.go('app.dashboard')
                  }  
                  else {
                       $scope.buttonText="Login";
              
                    $scope.errMsg =  'Incorrect credentials.';           
                  }

                    
                },
                function(){
                  $scope.errMsg = 'Server Request Error';
                })
                // .then(function(result) {
                
                //   // assumes if ok, response is an object with some data, if not, a string with error
                //   // customize according to your api
                //   if ( !result.formlg) {
                //    $scope.authMsg = 'Incorrect credentials.';
                //   }else{
                //     // $state.go('app.dashboard');
                //       vm.authMsg = 'hellow';
                //   }
                //      alert(result.token);
                // }, function() {
                //   vm.authMsg = 'Server Request Error';
                // });
            
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }

          };
        }
    }


})();
