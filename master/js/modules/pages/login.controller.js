// (function () {
//     'use strict';

//     angular
//         .module('app.pages')
//         .controller('AuthLoginController', Controller);

//     function Controller($location, AuthenticationService) {
//         var vm = this;

//         vm.login = login;

//         initController();

//         function initController() {
//             // reset login status
//             AuthenticationService.Logout();
//         };

//         function login() {


//             vm.loading = true;
//             AuthenticationService.Login(vm.username, vm.password, function (result,status) {
              
//                 if (result === true) {
//                     $location.path('/app/dashboard');
//                 } else {
//                       vm.loading = false;
             



//                        vm.error = 'Username or password is incorrect';

//                 }
//             });
//         };
//     }

// })();


