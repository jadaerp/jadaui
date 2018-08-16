(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualTransactionService', CasualTransactionService);

    CasualTransactionService.$inject = ['$resource','jadaApiUrl'];
    function CasualTransactionService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/CasualTransaction/:id', {id: '@id'},
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