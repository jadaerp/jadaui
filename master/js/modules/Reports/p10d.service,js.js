(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P10dService', P10dService);

    P10dService.$inject = ['$resource','jadaApiUrl'];
    function P10dService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p10dreport/:year', {year: '@year'},
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