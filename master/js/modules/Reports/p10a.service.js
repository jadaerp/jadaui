(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P10aService', P10aService);

    P10aService.$inject = ['$resource','jadaApiUrl'];
    function P10aService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p10areport/:periodId', {periodId: '@periodId'},
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