(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P10cService', P10cService);

    P10cService.$inject = ['$resource','jadaApiUrl'];
    function P10cService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p10creport/:year', {year: '@year'},
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