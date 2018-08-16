(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualCategoryService', CasualCategoryService);

    CasualCategoryService.$inject = ['$resource','jadaApiUrl'];
    function CasualCategoryService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/casualcategory/:id', {id: '@id'},
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