/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('CommonDataPostingController', CommonDataPostingController);

    CommonDataPostingController.$inject = ['$filter', '$http', 'editableOptions', 'editableThemes','$q','jadaApiUrl'];
    function CommonDataPostingController($filter, $http, editableOptions, editableThemes, $q,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////


        function activate() {

          // editable row
          // ----------------------------------- 
          vm.posting = [
         
          ];

          vm.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'},
            {value: 4, text: 'status4'}
          ];

          vm.employees = [];
          vm.loadEmployees = function() {
            return vm.employees.length ? null : $http.get(jadaApiUrl+'api/employee').success(function(data) {
              vm.employees = data;
            });
          };


           vm.codes = [];
          vm.loadCodes = function() {
            return vm.codes.length ? null : $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
              vm.codes = data;

            });
          };

           vm.employeeGroups = [];
          vm.loadEmployeeGroups = function() {
            return vm.employeeGroups.length ? null : $http.get(jadaApiUrl+'api/employeeGroup').success(function(data) {
              vm.employeeGroups = data;

            });
          };

           vm.employeeCategories = [];
          vm.loadEmployeeCategories = function() {
            return vm.employeeCategories.length ? null : $http.get(jadaApiUrl+'api/employeeCategory').success(function(data) {
              vm.employeeCategories = data;

            });
          };


          vm.showEmployees = function(posting) {
            if(posting.employeeID && vm.employees.length) {
              var selected = $filter('filter')(vm.employees, {id: posting.employeeId});
              return selected.length ? selected[0].employeeId : 'Not set';
            } else {
              return posting.employeeId || 'Not set';
            }
          };

  

          vm.showCode = function(posting) {
            var selected = [];
            if(posting.payrollCodeId) {
              selected = $filter('filter')(vm.codes, {id: posting.payrollCodeId});
            }
            return selected.length ? selected[0].code+" - "+selected[0].description  : 'Not set';
          };

          vm.showEmployeeGroup = function(posting) {
            var selected = [];
            if(posting.employeeGroupId) {
              selected = $filter('filter')(vm.employeeGroups, {id: posting.employeeGroupId});
            }
            return selected.length ? selected[0].code+" - "+selected[0].description  : 'Not set';
          };


          vm.showEmployeeCategory = function(posting) {
            var selected = [];
            if(posting.EmployeeCategoryId) {
              selected = $filter('filter')(vm.employeeCategories, {id: posting.EmployeeCategoryId});
            }
            return selected.length ? selected[0].code+" - "+selected[0].description : 'Not set';
          };

          vm.showStatus = function(user) {
            var selected = [];
            if(user.status) {
              selected = $filter('filter')(vm.statuses, {value: user.status});
            }
            return selected.length ? selected[0].text : 'Not set';
          };

          vm.checkName = function(data, id) {
            if (id === 2 && data !== 'awesome') {
              return 'Username 2 should be `awesome`';
            }
          };



          vm.saveData = function(data) {
            //vm.user not updated yet
            angular.extend(data);
            // console.log(data.employeeID);
            // console.log(data);
            return $http.post(jadaApiUrl+'api/payrollmassposting', data);
            vm.addData();
          
          };


          // remove user
          vm.removeData = function(index) {
            vm.posting.splice(index, 1);
          };

          // add user
          vm.addData = function() {
            vm.inserted = {
          
              payrollCodeId: null,
              amount: null,
              isNew: true
            };
            vm.posting.push(vm.inserted);
          };

          vm.addData();

          // editable column
          // ----------------------------------- 


       

          // editable table
          // ----------------------------------- 

          // filter users to show
          vm.filterUser = function(user) {
            return user.isDeleted !== true;
          };

          // mark user as deleted
          vm.deleteUser = function(id) {
            var filtered = $filter('filter')(vm.users, {id: id});
            if (filtered.length) {
              filtered[0].isDeleted = true;
            }
          };

          // cancel all changes
          vm.cancel = function() {
            for (var i = vm.users.length; i--;) {
              var user = vm.users[i];
              // undelete
              if (user.isDeleted) {
                delete user.isDeleted;
              }
              // remove new 
              if (user.isNew) {
                vm.users.splice(i, 1);
              }
            }
          };


        }
    }
})();
