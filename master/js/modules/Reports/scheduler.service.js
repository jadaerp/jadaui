(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('SchedulerService', SchedulerService);

    SchedulerService.$inject = ['$resource','jadaApiUrl'];
    function SchedulerService($resource,jadaApiUrl) {
      var data=$resource(jadaApiUrl+'api/periodbasedScheduler/:id', {id: '@id'},
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