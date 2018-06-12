(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P9bService', P9bService);

    P9bService.$inject = ['$resource','jadaApiUrl'];
    function P9bService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p9breport/:periodId', {periodId: '@periodId'},
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