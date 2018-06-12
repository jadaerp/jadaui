(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('CompanyTotalsService', CompanyTotalsService);

    CompanyTotalsService.$inject = ['$resource','jadaApiUrl'];
    function CompanyTotalsService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/CompanyTotalsReport/:periodId', {periodId: '@periodId'},
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
