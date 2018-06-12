(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('NssfService', NssfService);

    NssfService.$inject = ['$resource','jadaApiUrl'];
    function NssfService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/nssfreport/:periodId', {periodId: '@periodId'},
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