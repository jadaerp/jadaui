

(function() {
    'use strict';

    angular
        .module('app.company')
        .factory('financialPeriodService', financialPeriodService);

    financialPeriodService.$inject = ['$resource','jadaApiUrl'];
    function financialPeriodService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/period/:id', {id: '@id'},
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