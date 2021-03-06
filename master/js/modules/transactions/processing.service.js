(function() {
    'use strict';

    angular
        .module('app.transactions')
        .factory('PayrollProcessingService', PayrollProcessingService);

    PayrollProcessingService.$inject = ['$resource','jadaApiUrl'];
    function PayrollProcessingService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollposting/:id', {id: '@id'},
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