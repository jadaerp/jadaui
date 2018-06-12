(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('P10Service', P10Service);

    P10Service.$inject = ['$resource','jadaApiUrl'];
    function P10Service($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/p10report/:year', {year: '@year'},
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