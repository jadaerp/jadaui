(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('PayslipService', PayslipService);

    PayslipService.$inject = ['$resource','jadaApiUrl'];
    function PayslipService($resource,jadaApiUrl) {
     var data=$resource('http://localhost:56135/api/payslipreport/:id', {id: '@id'},
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