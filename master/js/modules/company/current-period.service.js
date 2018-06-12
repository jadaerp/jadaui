(function() {
    'use strict';

    angular
        .module('app.company')
        .factory('CurrentPeriod', CurrentPeriod);

    CurrentPeriod.$inject = ['$resource','jadaApiUrl'];
    function CurrentPeriod($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/currentperiod/:id', {id: '@id'},
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