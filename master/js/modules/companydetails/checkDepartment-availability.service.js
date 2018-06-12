
(function() {
    'use strict';

    angular
        .module('app.companydetails')
        .factory('DeptAvailability', DeptAvailability);

    DeptAvailability.$inject = ['$resource','jadaApiUrl','$http', '$q'];
    function DeptAvailability($resource,jadaApiUrl,$http, $q) {
        return {
        IsDeptAvailablle: function (dept) {
            // Get the deferred object
            var deferred = $q.defer();
            // Initiates the AJAX call
            $http({ method: 'GET', url: jadaApiUrl+'api/department?code=' + dept }).success(deferred.resolve).error(deferred.reject);
            // Returns the promise - Contains result once request completes
            return deferred.promise;
        }
    }
       
    }

})();
