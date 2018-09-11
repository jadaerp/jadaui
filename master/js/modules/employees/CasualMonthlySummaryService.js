(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualMonthlySummaryService', CasualMonthlySummaryService);

    CasualMonthlySummaryService.$inject = ['$resource','jadaApiUrl'];
    function CasualMonthlySummaryService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/casualMonthlySummary/:id', {id: '@id'},
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