
(function() {
    'use strict';

    angular
        .module('app.transactions')
        .factory('PayrollBatchPostingService', PayrollBatchPostingService);

    PayrollBatchPostingService.$inject = ['$resource','jadaApiUrl'];
    function PayrollBatchPostingService($resource,jadaApiUrl) {
     var data=$resource(jadaApiUrl+'api/payrollsingleposting', 
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




