
(function() {
    'use strict';

    angular
        .module('app.transactions')
        .factory('EmployeePayrollBatchPostingService', EmployeePayrollBatchPostingService);

    EmployeePayrollBatchPostingService.$inject = ['$resource','jadaApiUrl'];
    function EmployeePayrollBatchPostingService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollbatchposting', 
    {
  'save':   {
    method:'POST',  isArray:true,  transformRequest: function(data){
                        console.log('Data in transform request is');
                        console.log(data);
                        return angular.toJson(data); // this will go in the body request
                    }
},

});
     return data
          
       
    }

})();




