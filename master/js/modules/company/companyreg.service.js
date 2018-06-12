


(function() {
    'use strict';

    angular
        .module('app.company')
        .factory('companyService', companyService);

    companyService.$inject = ['$resource','jadaApiUrl'];
    function companyService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/company/:ID', {ID: '@ID'},
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