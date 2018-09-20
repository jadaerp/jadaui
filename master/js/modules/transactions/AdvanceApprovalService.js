(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('AdvanceApprovalService', AdvanceApprovalService);

    AdvanceApprovalService.$inject = ['$resource','jadaApiUrl'];
    function AdvanceApprovalService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/advancetransaction/:id', {id: '@id'},
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