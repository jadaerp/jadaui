
  (function() {
      'use strict';

      angular
          .module('app.maintenance')
          .factory('CompanySummaryMappingService', CompanySummaryMappingService);

      CompanySummaryMappingService.$inject = ['$resource','jadaApiUrl'];
      function CompanySummaryMappingService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/companysummarymapping/:id', {id: '@id'},
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