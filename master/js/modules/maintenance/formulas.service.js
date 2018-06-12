

// (function() {
//     'use strict';

//     angular
//         .module('app.maintenance')
//         .factory('formulasService',  function($resource) {
//                 // return $resource('https://jsonplaceholder.typicode.com/users/:user', {user: '@user'});
//         //return $resource('http://localhost:9418/jada/payroll/CreateEmployeeGroups/');
//      var data=$resource('http://localhost:56135/api/formula/:id', {id: '@id'},
//     { 'get':    {method:'GET', isArray:false},
//   'save':   {method:'POST'},
//   'query':  {method:'GET', isArray:true},
//   'update': { method:'PUT' },
//   'remove': {method:'DELETE'},
//   'delete': {method:'DELETE'} 
// });
//      return data
//     });
// })();


(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('formulasService', formulasService);

    formulasService.$inject = ['$resource','jadaApiUrl'];
    function formulasService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/formula/:id', {id: '@id'},
    { 'get':    {method:'GET', isArray:false},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'update': { method:'PUT' },
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} 
});
     return data
          
       
    }

})();