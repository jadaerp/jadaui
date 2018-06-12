// (function () {
//     'use strict';

//     angular
//         .module('app.pages')
//         .factory('AuthenticationService', Service);

//     function Service($http, $localStorage) {
//         var service = {};

//                          service.authMsg="";
//         service.Login = Login;
//         service.Logout = Logout;

//         return service;

//         function Login(username, password, callback) {
//             $http.post('http://localhost:56135/api/login', { username: username, password: password })
//                 .success(function (response) {

//                     // login successful if there's a token in the response
//                     if (response.token) {
//                         // store username and token in local storage to keep user logged in between page refreshes
//                         $localStorage.currentUser = { username: username, token: response.token, isAuthenticated:true };


//                         // add jwt token to auth header for all requests made by the $http service
//                         $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

//                         // execute callback with true to indicate successful login
//                         callback(true);
//                     } else {
//                         // execute callback with false to indicate failed login
//                         callback(false);

//                          service.authMsg = response;
                     
//                     }
//                 });
//         }

//         function Logout() {
//             // remove user from local storage and clear http auth header
//             delete $localStorage.currentUser;
//             $http.defaults.headers.common.Authorization = '';
//         }
//     }
// })();


//    // $http
//    //              .post('api/account/register', {email: vm.account.email, password: vm.account.password})
//    //              .then(function(response) {
//    //                // assumes if ok, response is an object with some data, if not, a string with error
//    //                // customize according to your api
//    //                if (!response.account ) {
//    //                  vm.authMsg = response;
//    //                }else{
//    //                  $state.go('app.dashboard');
//    //                }
//    //              }, function() {
//    //                vm.authMsg = 'Server Request Error';
//    //              });