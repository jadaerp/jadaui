
  (function() {
      'use strict';

      angular
          .module('app.companydetails')
          .factory('LeaveBalanceService', LeaveBalanceService);

      LeaveBalanceService.$inject = ['$resource','jadaApiUrl'];
      function LeaveBalanceService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/leavebalance/:id', {id: '@id'},
      { 'get':    {method:'GET', isArray:true},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'update': { method:'PUT' },
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} 
  });
       return data
            
         
      }

  })();
