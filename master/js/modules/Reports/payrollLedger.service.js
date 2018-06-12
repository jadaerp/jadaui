


(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('PayrollLedgerService', PayrollLedgerService);

    PayrollLedgerService.$inject = ['$resource','jadaApiUrl'];
    function PayrollLedgerService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollLedger/:id', {id: '@id'},
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