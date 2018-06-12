(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('PayeService', PayeService);

    PayeService.$inject = ['$resource','jadaApiUrl'];
    function PayeService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payereport/:periodId', {periodId: '@periodId'},
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