
  (function() {
      'use strict';

      angular
          .module('app.employees')
          .factory('CasualsService', CasualsService);

      CasualsService.$inject = ['$resource','jadaApiUrl'];
      function CasualsService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/casuals/:id', {id: '@id'},
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