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

(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('SchedulerEmployeeBasedReportService', SchedulerEmployeeBasedReportService);

    SchedulerEmployeeBasedReportService.$inject = ['$resource','jadaApiUrl'];
    function SchedulerEmployeeBasedReportService() {
      var myjsonObj = null;//the object to hold our data
     return {
     getJson:function(){
       return myjsonObj;
     },
     setJson:function(value){
      myjsonObj = value;
     }
    }
       
    }

})();

(function() {
    'use strict';

    angular
        .module('app.reports')
        .factory('SchedulerPeriodBasedReportService', SchedulerPeriodBasedReportService);

    SchedulerPeriodBasedReportService.$inject = ['$resource','jadaApiUrl'];
    function SchedulerPeriodBasedReportService() {
      var myjsonObj = null;//the object to hold our data
     return {
     getJson:function(){
       return myjsonObj;
     },
     setJson:function(value){
      myjsonObj = value;
     }
    }
       
    }

})();