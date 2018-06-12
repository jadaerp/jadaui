
  (function() {
      'use strict';

      angular
          .module('app.transactions')
          .factory('EmployeeBatchPostingService', EmployeeBatchPostingService);

      EmployeeBatchPostingService.$inject = ['$resource','jadaApiUrl'];
      function EmployeeBatchPostingService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/employeesingleposting', 
      {
    'save':   {
      method:'POST'
  },

  });
       return data
            
         
      }

  })();
