  (function() {
      'use strict';

      angular
          .module('app.companydetails')
          .factory('GetleaveTypeService', GetleaveTypeService);

      GetleaveTypeService.$inject = ['$resource','jadaApiUrl'];
      function GetleaveTypeService($resource,jadaApiUrl) {
       var data=$resource(jadaApiUrl+'api/leavetype/:id', {id: '@id'},
      { 'get':    {method:'GET', isArray:false},

    'query':  {method:'GET', isArray:true}

  });
       return data
            
         
      }

  })();
