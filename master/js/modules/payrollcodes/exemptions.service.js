
(function() {
    'use strict';

    angular
        .module('app.payrollcodes')
        .factory('ExemptionsService', ExemptionsService);

    ExemptionsService.$inject = ['$resource','jadaApiUrl'];
    function ExemptionsService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/exemption/:id', {id: '@id'},
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

