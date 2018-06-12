

(function() {
    'use strict';

    angular
        .module('app.company')
        .factory('financialYearService', financialYearService);

    financialYearService.$inject = ['$resource','jadaApiUrl'];
    function financialYearService($resource,jadaApiUrl) {
           // var data=$resource(jadaApiUrl+'api/financialyear/:id', {id: '@id'},
     var data=$resource(jadaApiUrl+'api/financialyear/',
    { 'get':    {method:'GET', isArray:false},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  // 'update': { method:'PUT' },
  // 'remove': {method:'DELETE'},
  // 'delete': {method:'DELETE'} 
});
     return data
          
       
    }

})();