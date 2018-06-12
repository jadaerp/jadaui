
  (function() {
      'use strict';

      angular
          .module('app.companydetails')
          .factory('leaveService', leaveService);

      leaveService.$inject = ['$resource','jadaApiUrl'];
      function leaveService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/leavetype/:id', {id: '@id'},
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
