// /**=========================================================
//  * Module: access-login.js
//  * Demo for login api
//  =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LogoutController', LoginFormController);

    LoginFormController.$inject = ['$scope','$http', '$state','$localStorage','jadaApiUrl'];
    function LoginFormController($scope, $http, $state,$localStorage,jadaApiUrl) {


 $scope.Logout=function() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
                $state.go('page.login');
        }


    }


})();
