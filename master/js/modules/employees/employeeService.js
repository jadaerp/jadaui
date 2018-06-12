
  (function() {
      'use strict';

      angular
          .module('app.employees')
          .factory('EmployeeService', EmployeeService);

      EmployeeService.$inject = ['$resource','jadaApiUrl'];
      function EmployeeService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/employee/:id', {id: '@id'},
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