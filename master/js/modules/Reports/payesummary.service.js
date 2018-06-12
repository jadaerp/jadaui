(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('PayeSummaryService', PayeSummaryService);

    PayeSummaryService.$inject = ['$resource','jadaApiUrl'];
    function PayeSummaryService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payesummary/:periodId', {periodId: '@periodId'},
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