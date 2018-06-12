(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P9aService', P9aService);

    P9aService.$inject = ['$resource','jadaApiUrl'];
    function P9aService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p9areport/:year', {year: '@year'},
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