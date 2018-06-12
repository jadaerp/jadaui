(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('LeaveReportService', LeaveReportService);

    LeaveReportService.$inject = ['$resource','jadaApiUrl'];
    function LeaveReportService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/leavereport/:periodId/:leaveTypeId', {periodId: '@periodId',leaveTypeId:'@leaveTypeId'},
    { 'get':{method:'GET', isArray:false},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'update': { method:'PUT' },
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} 
});
     return data
          
       
    }

})();
