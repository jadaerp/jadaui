(function() {
    'use strict';

    angular
        .module('app.transactions')
        .factory('PayrollApprovalService', PayrollApprovalService);

    PayrollApprovalService.$inject = ['$resource','jadaApiUrl'];
    function PayrollApprovalService($resource,jadaApiUrl) {

        // var data=$resource('https://jsonplaceholder.typicode.com/users/:user', {user: '@user'},
           // var data=$resource(jadaApiUrl+'api/payrolltransactionapproval/:periodId',{periodId: '@periodId'}, 
     var data=$resource(jadaApiUrl+'api/payrolltransactionapproval/:periodId',{periodId: '@periodId'}, 
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