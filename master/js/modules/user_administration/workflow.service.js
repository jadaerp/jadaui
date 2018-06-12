
(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .factory('WorkflowService', WorkflowService);

    WorkflowService.$inject = ['$resource','jadaApiUrl'];
    function WorkflowService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/workflow/:id', {id: '@id'},
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