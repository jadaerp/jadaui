
(function() {
    'use strict';

    angular
        .module('app.payrollcodes')
        .factory('PayrollCodesService', PayrollCodesService);

    PayrollCodesService.$inject = ['$resource','jadaApiUrl'];
    function PayrollCodesService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollcode/:id', {id: '@id'},
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


