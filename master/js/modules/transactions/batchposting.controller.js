/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('BatchPostingController', BatchPostingController);

    BatchPostingController.$inject = ['$filter', '$http', 'editableOptions', 'editableThemes','$q','jadaApiUrl'];
    function BatchPostingController($filter, $http, editableOptions, editableThemes, $q,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // editable row
          // ----------------------------------- 
          vm.posting = [
            // {periodId:12, employeeId: 1, payrollCodeId: 2, amount: 4},
            // {periodId:12, employeeId: 2, payrollCodeId: 6, amount: 3},
            // {periodId: 12, employeeId: 2, payrollCodeId: 2, amount: null}
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
              console.log(vm.employees);
            });
          };


           vm.codes = [];
          vm.loadCodes = function() {
            return vm.codes.length ? null : $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
              vm.codes = data;

            });
          };
 // vm.showEmployees = function(posting) {
 //            if(posting.employeeID && vm.employees.length) {
 //              var selected = $filter('filter')(vm.employees, {id: posting.employeeId});
 //              return selected.length ? selected[0].employeeNumber : 'Not set';
 //            } 
 //          };


          vm.showEmployees=function(posting) {
            var selected = [];
            if(posting.employeeId) {
              selected = $filter('filter')(vm.employees, {id: posting.employeeId});
            }
            return selected.length ? selected[0].employeeNumber : 'Not set';
          };
  

          vm.showCode = function(posting) {
            var selected = [];
            if(posting.payrollCodeId) {
              selected = $filter('filter')(vm.codes, {id: posting.payrollCodeId});
            }
            return selected.length ? selected[0].code : 'Not set';
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

          vm.saveUser = function(data) {
            //vm.user not updated yet
            angular.extend(data);
            console.log(data.employeeID);
            console.log(data);
            return $http.post(jadaApiUrl+'api/payrollposting', data);
          };

          // remove user
          vm.removeUser = function(index) {
            vm.posting.splice(index, 1);
          };

          // add user
          vm.addUser = function() {
            vm.inserted = {
               periodId: 12,
              employeeId: null,
              payrollCodeId: null,
              amount: null,
              isNew: true
            };
            vm.posting.push(vm.inserted);
          };

          // editable column
          // ----------------------------------- 


          vm.saveColumn = function(column) {
            var results = [];
            angular.forEach(vm.users, function(/*user*/) {
              // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
              console.log('Saving column: ' + column);
            });
            return $q.all(results);
          };

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

          // save edits
          vm.saveTable = function() {
            var results = [];
            for (var i = vm.users.length; i--;) {
              var user = vm.users[i];
              // actually delete user
              if (user.isDeleted) {
                vm.users.splice(i, 1);
              }
              // mark as not new 
              if (user.isNew) {
                user.isNew = false;
              }

              // send on server
              // results.push($http.post('/saveUser', user));
              console.log('Saving Table...');
            }

            return $q.all(results);
          };

        }
    }
})();
