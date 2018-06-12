
  (function() {
      'use strict';

      angular
          .module('app.companydetails')
          .factory('EmpcatService', EmpcatService);

      EmpcatService.$inject = ['$resource','jadaApiUrl'];
      function EmpcatService($resource,jadaApiUrl) {
             //return $resource('http://localhost:9418/jada/payroll/CreateEmployeeGroups/');
       var data=$resource(jadaApiUrl+'api/employeecategory/:id', {id: '@id'},
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

