(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P10bService', P10bService);

    P10bService.$inject = ['$resource','jadaApiUrl'];
    function P10bService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p10breport/:year', {year: '@year'},
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