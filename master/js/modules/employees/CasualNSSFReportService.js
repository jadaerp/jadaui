(function() {
    'use strict';

    angular
        .module('app.maintenance')
        .factory('CasualNSSFReportService', CasualNSSFReportService);

    CasualNSSFReportService.$inject = ['$resource','jadaApiUrl'];
    function CasualNSSFReportService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/casualNSSFReport/:id', {id: '@id'},
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