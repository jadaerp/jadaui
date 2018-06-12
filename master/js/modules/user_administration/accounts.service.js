
  (function() {
      'use strict';

      angular
          .module('app.useradministration')
          .factory('UserAccountService', UserAccountService);

      UserAccountService.$inject = ['$resource','jadaApiUrl'];
      function UserAccountService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/account/:id', {id: '@id'},
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