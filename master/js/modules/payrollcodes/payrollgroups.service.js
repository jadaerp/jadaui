
(function() {
    'use strict';

    angular
        .module('app.payrollcodes')
        .factory('PayrollGroupService', PayrollGroupService);

    PayrollGroupService.$inject = ['$resource','jadaApiUrl'];
    function PayrollGroupService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollcodegroup/:id', {id: '@id'},
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






