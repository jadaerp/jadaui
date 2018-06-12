


(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('PayrollLedgerReportService', PayrollLedgerReportService);

    PayrollLedgerReportService.$inject = ['$resource','jadaApiUrl'];
    function PayrollLedgerReportService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollLedgerReport/:id', {id: '@id'},
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