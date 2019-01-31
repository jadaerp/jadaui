


(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('PastelPayrollJournalService', PastelPayrollJournalService);

    PastelPayrollJournalService.$inject = ['$resource','jadaApiUrl'];
    function PastelPayrollJournalService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/pastelpayrolljournal/:id', {id: '@id'},
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