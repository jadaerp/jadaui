(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualPayeReportService', CasualPayeReportService);

    CasualPayeReportService.$inject = ['$resource','jadaApiUrl'];
    function CasualPayeReportService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/casualPayeReport/:id', {id: '@id'},
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