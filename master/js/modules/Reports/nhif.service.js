(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('NhifService1', NhifService1);

    NhifService1.$inject = ['$resource','jadaApiUrl'];
    function NhifService1($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/nhifreport/:periodId', {periodId: '@periodId'},
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