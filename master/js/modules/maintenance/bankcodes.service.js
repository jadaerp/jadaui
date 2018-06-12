
  (function() {
      'use strict';

      angular
          .module('app.maintenance')
          .factory('bankcodeService', bankcodeService);

      bankcodeService.$inject = ['$resource','jadaApiUrl'];
      function bankcodeService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/bankbranchcode/:id', {id: '@id'},
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
