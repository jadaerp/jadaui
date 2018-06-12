(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('BankfileService', BankfileService);

    BankfileService.$inject = ['$resource','jadaApiUrl'];
    function BankfileService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/bankfilereport',
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