// (function() {
//     'use strict';

//     angular
//         .module('app.pages')
//         .factory('register',  function($resource) {
        
//         return $resource('http://localhost:56135/api/systemsetup');
//         // return $resource('http://localhost:9418/jada/Management/CompanyRegistration/');
//         // http://localhost:9418/jada/Authentication/CompanyRegistration
//     });
// })();





(function() {
    'use strict';

    angular
        .module('app.pages')
        .factory('register', register);

    register.$inject = ['$resource','jadaApiUrl'];
    function register($resource,jadaApiUrl) {
    	  return $resource(jadaApiUrl+'api/systemsetup');
    
          
       
    }

})();