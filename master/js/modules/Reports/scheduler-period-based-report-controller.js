

(function() {
    'use strict';

    angular
        .module('app.reports')
        .controller('SchedulerPeriodBasedReportController', SchedulerPeriodBasedReportController);

    SchedulerPeriodBasedReportController.$inject = ['$rootScope','$state','$scope','$http','$resource','SchedulerPeriodBasedReportService','jadaApiUrl'];
    function SchedulerPeriodBasedReportController($rootScope,$state,$scope,$http,$resource,SchedulerPeriodBasedReportService,jadaApiUrl) {
        var vm = this;

        activate();



        function activate() {
           $scope.periodBasedSchedulerReport=SchedulerPeriodBasedReportService.getJson();
           console.log("data");
           console.log($scope.periodBasedSchedulerReport);

        }
    }
})();
















