

(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('SchedulerEmployeeBasedReportController', SchedulerEmployeeBasedReportController);

    SchedulerEmployeeBasedReportController.$inject = ['$rootScope','$state','$scope','$http','$resource','SchedulerEmployeeBasedReportService','jadaApiUrl'];
    function SchedulerEmployeeBasedReportController($rootScope,$state,$scope,$http,$resource,SchedulerEmployeeBasedReportService,jadaApiUrl) {
        var vm = this;

        activate();



        function activate() {
           $scope.periodBasedSchedulerReport=SchedulerEmployeeBasedReportService.getJson();
           console.log("data");
           console.log($scope.periodBasedSchedulerReport);

        }
    }
})();
















