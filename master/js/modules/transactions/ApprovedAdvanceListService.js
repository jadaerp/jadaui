(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('ApprovedAdvanceListService', ApprovedAdvanceListService);

    ApprovedAdvanceListService.$inject = ['$resource','jadaApiUrl'];
    function ApprovedAdvanceListService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/approvedadvancetransaction/:id', {id: '@id'},
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