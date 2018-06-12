(function() {
    'use strict';

    angular
        .module('app.transactions')
        .factory('LeaveProcessingService', LeaveProcessingService);

    LeaveProcessingService.$inject = ['$resource','jadaApiUrl'];
    function LeaveProcessingService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/leaveprocessing/:id', {id: '@id'},
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