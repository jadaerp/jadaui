
(function() {
    'use strict';

    angular
        .module('app.companydetails')
        .factory('CompanyInfoService', CompanyInfoService);

    CompanyInfoService.$inject = ['$resource','jadaApiUrl'];
    function CompanyInfoService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/statutory/:id', {id: '@id'},
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