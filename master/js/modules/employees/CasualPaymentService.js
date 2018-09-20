(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualPaymentService', CasualPaymentService);

    CasualPaymentService.$inject = ['$resource','jadaApiUrl'];
    function CasualPaymentService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/pendingPaymentcasualtransaction/:id', {id: '@id'},
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