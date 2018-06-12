

(function() {
    'use strict';

    angular
        .module('app.companydetails')
        .factory('DeptService', DeptService);

    DeptService.$inject = ['$resource','jadaApiUrl'];
    function DeptService($resource,jadaApiUrl) {
           //return $resource('http://localhost:9418/jada/payroll/CreateEmployeeGroups/');
     var data=$resource(jadaApiUrl+'api/department/:ID', {ID: '@ID'},
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

