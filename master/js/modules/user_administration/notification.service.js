
(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['$resource','jadaApiUrl'];
    function NotificationService($resource,jadaApiUrl) {
     // var data=$resource(jadaApiUrl+'api/account/:id', {id: '@id'},
        var data=$resource('https://jsonplaceholder.typicode.com/users/:user', {user: '@user'},
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