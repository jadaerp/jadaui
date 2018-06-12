(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$http','$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors','$location', '$localStorage'];

    function appRun($http,$rootScope, $state, $stateParams, $window, $templateCache, Colors , $location, $localStorage) {

if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }


        // Hook into ocLazyLoad to setup AngularGrid before inject into the app
        // See "Creating the AngularJS Module" at
        // https://www.ag-grid.com/best-angularjs-data-grid/index.php
        var offevent = $rootScope.$on('ocLazyLoad.fileLoaded', function(e, file) {
            if (file.indexOf('ag-grid.js') > -1) {
                agGrid.initialiseAgGridWithAngular1(angular);
                offevent();
            }
        });

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });*/
   $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/page/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/page/login');
                 
            }
        });



// routerApp.run(function ($rootScope, $state, AuthService) {
//     $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
//         if (toState.authenticate && !AuthService.IsAuthenticated()) {
//             alert("Not Authenticated");
//             // User isn’t authenticated
//             $state.transitionTo("login");
//             event.preventDefault(); 
//         }
//     });
// });

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // -----------------------------------

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function(event, unfoundState /*, fromState, fromParams*/ ) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log(error);
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function( /*event, toState, toParams, fromState, fromParams*/ ) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
            });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };

    }

})();



// routerApp.service('AuthService', function () {
//     this._isAuthenticated = false;
//     this._isAccessToken = '';
//     this.IsAuthenticated = function () {
//         return this._isAuthenticated;
//     }
// });