(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualApprovalService', CasualApprovalService);

    CasualApprovalService.$inject = ['$resource','jadaApiUrl'];
    function CasualApprovalService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/pendingapprovalcasualtransaction/:id', {id: '@id'},
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