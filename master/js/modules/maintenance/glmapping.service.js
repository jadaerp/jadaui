
  (function() {
      'use strict';

      angular
          .module('app.maintenance')
          .factory('GlMappingService', GlMappingService);

      GlMappingService.$inject = ['$resource','jadaApiUrl'];
      function GlMappingService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/payrollledgermapping/:id', {id: '@id'},
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