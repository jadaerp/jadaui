

(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .factory('UserGroupService', UserGroupService);

    UserGroupService.$inject = ['$resource','jadaApiUrl'];
    function UserGroupService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/useraccount/:ID', {ID: '@ID'},
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