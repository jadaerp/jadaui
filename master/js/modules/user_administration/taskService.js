
(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .factory('TaskService', TaskService);

    TaskService.$inject = ['$resource','jadaApiUrl'];
    function TaskService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/task/:id', {id: '@id'},
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