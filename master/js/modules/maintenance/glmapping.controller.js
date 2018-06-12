
  /**=========================================================
   * Module: modals.js
   * Provides a simple way to implement bootstrap modals from templates
   =========================================================*/
  (function() {
      'use strict';

      angular
          .module('app.bootstrapui')
          .controller('GlmappingController', GlmappingController);

      GlmappingController.$inject = ['$scope','$http', '$rootScope','$uibModal','GlMappingService','$stateParams', '$state','jadaApiUrl'];
      function GlmappingController($scope,$http,$rootScope, $uibModal, GlMappingService,$stateParams, $state,jadaApiUrl) {
          var vm = this;

          activate();

          ////////////////

          function activate() {

 var SuccessMsg;
 var errorMsg;

  $scope.glmappings=GlMappingService.query();
  console.log($scope.glmappings);
    $scope.loadglMapping = function () {
          $scope.glmappings=GlMappingService.query();
     }

   $rootScope.$on("CallLoadglMapping", function(){
             $scope.loadglMapping ();
          });




  $http.get(jadaApiUrl+'api/costcenter').success(function(data) {
                $scope.centers = data;

              });

  $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
               $scope.pcodes = data;
         

            });
    $http.get(jadaApiUrl+'api/payrollLedger').success(function(data) {
               $scope.legercodes = data;
         

            });


    $scope.delete= function (gll) {
      var gl=new GlMappingService(gll);
     gl.$delete().then(function () {
      $scope.loadglMapping();

  });
  }
            
            $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                templateUrl: 'newgGLMapping.html',
                controller: ModalOpenBankInstanceCtrl,
                size: size
              });





              var state = $('#modal-state');
              modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
              }, function () {
                state.text('Modal dismissed with Cancel status');
              });
            };




    $scope.show = function(glmapping) {
        // $scope.x = x;
        var modalInstance = $uibModal.open({
          templateUrl: 'editgGLMapping.html',
          controller: ModalInstanceCtrl,
          resolve: {
             glmapping: function () {
              console.log(glmapping);
               return glmapping;
             }
           }        
          // scope : $scope
        });
      };

      



   


            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalOpenBankInstanceCtrl.$inject = ['$scope', '$uibModalInstance','GlMappingService'];
            function ModalOpenBankInstanceCtrl($scope, $uibModalInstance, GlMappingService) {
            
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.gl=new GlMappingService();

               $scope.submitGl=function() {
            $scope.gl.$save().then(function(data){
              var response=angular.fromJson(data);
       
            if(response.Status=="1"){
                     $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
                    // $scope.pl=PayrollLedgerService.get({id:id});
            }else{
           
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
          
            }
         
              
                 $rootScope.$emit("CallLoadglMapping", {});
                 
            },   function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
            };

               $scope.submitCloseGl=function() {
            $scope.gl.$save().then(function(data){
              var response=angular.fromJson(data);
       
            if(response.Status=="1"){
                     $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
                    $scope.cancel();
                    // $scope.pl=PayrollLedgerService.get({id:id});
            }else{
           
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
          
            }
         
              
                 $rootScope.$emit("CallLoadglMapping", {});
                 
            },   function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
    
            };            
           
            }


             ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance','GlMappingService','glmapping'];
            function ModalInstanceCtrl($scope, $uibModalInstance, GlMappingService,glmapping) {
            $scope.gl=glmapping;
              $scope.ok = function () {
                $uibModalInstance.close('closed');
              };

              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };


              $scope.glUpdate=function(gl){
    
              
              gl.$update().then(function(){
                  var response=angular.fromJson(data);
       
            if(response.Status=="1"){
                     $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
                    // $scope.pl=PayrollLedgerService.get({id:id});
            }else{
           
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
          
            }
         
              
                 $rootScope.$emit("CallLoadglMapping", {});
          
              },function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
            

              };

           
            }
          }
      }

  })();







/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

// (function() {
//     'use strict';

//     angular
//         .module('app.tables')
//         .controller('GlmappingController', GlmappingController);

//     GlmappingController.$inject = ['$filter', '$http', 'editableOptions', 'editableThemes','$q','jadaApiUrl'];
//     function GlmappingController($filter, $http, editableOptions, editableThemes, $q,jadaApiUrl) {
//         var vm = this;

//         activate();

//         ////////////////

//         function activate() {

//           // editable row
//           // ----------------------------------- 
//           vm.glcodes = [
//             {MappingCode:'M001', MappingDescription:'Payroll Cost - Deployment', GeneralLedgerCode: 2000000, PayrollCode:'T003',DRCR: 'DR',CostCentre: 'C001'},
//              {MappingCode:'M001', MappingDescription: 'Payroll Cost - Development', GeneralLedgerCode: 2200000, PayrollCode:'T003',DRCR:'DR',CostCentre:'C001'},
//               {MappingCode:'M003', MappingDescription: 'Payroll Cost - Administration', GeneralLedgerCode: 3000005, PayrollCode:'T003',DRCR: 'DR',CostCentre:'C003'}
         
//           ];

//           vm.statuses = [
//             {value: 1, text: 'status1'},
//             {value: 2, text: 'status2'},
//             {value: 3, text: 'status3'},
//             {value: 4, text: 'status4'}
//           ];

//           vm.employees = [];
//           vm.loadEmployees = function() {
//             return vm.employees.length ? null : $http.get(jadaApiUrl+'api/employee').success(function(data) {
//               vm.employees = data;
//             });
//           };


//            vm.codes = [];
//           vm.loadCodes = function() {
//             return vm.codes.length ? null : $http.get(jadaApiUrl+'api/payrollcode').success(function(data) {
//               vm.codes = data;

//             });
//           };

//           vm.showEmployees = function(posting) {
//             if(posting.employeeID && vm.employees.length) {
//               var selected = $filter('filter')(vm.employees, {employeeId: posting.employeeId});
//               return selected.length ? selected[0].employeeId : 'Not set';
//             } else {
//               return posting.employeeId || 'Not set';
//             }
//           };

  

//           vm.showCode = function(posting) {
//             var selected = [];
//             if(posting.payrollCodeId) {
//               selected = $filter('filter')(vm.codes, {payrollCodeId: posting.payrollCodeId});
//             }
//             return selected.length ? selected[0].payrollCodeId : 'Not set';
//           };

//           vm.showStatus = function(user) {
//             var selected = [];
//             if(user.status) {
//               selected = $filter('filter')(vm.statuses, {value: user.status});
//             }
//             return selected.length ? selected[0].text : 'Not set';
//           };

//           vm.checkName = function(data, id) {
//             if (id === 2 && data !== 'awesome') {
//               return 'Username 2 should be `awesome`';
//             }
//           };

//           vm.saveUser = function(data) {
//             //vm.user not updated yet
//             angular.extend(data);
//             console.log(data.employeeID);
//             console.log(data);
//             return $http.post(jadaApiUrl+'api/payrollposting', data);
//           };

//           // remove user
//           vm.removeUser = function(index) {
//             vm.posting.splice(index, 1);
//           };

//           // add user
//           vm.addUser = function() {
//             vm.inserted = {
//                MappingCode:null,
//               MappingDescription: null,
//               PayrollCode: null,
//               DRCR: null,
//                CostCentre: null,
//               isNew: true
//             };
//             vm.glcodes.push(vm.inserted);
//           };

//           // editable column
//           // ----------------------------------- 


//           vm.saveColumn = function(column) {
//             var results = [];
//             angular.forEach(vm.users, function(/*user*/) {
//               // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
//               console.log('Saving column: ' + column);
//             });
//             return $q.all(results);
//           };

//           // editable table
//           // ----------------------------------- 

//           // filter users to show
//           vm.filterUser = function(user) {
//             return user.isDeleted !== true;
//           };

//           // mark user as deleted
//           vm.deleteUser = function(id) {
//             var filtered = $filter('filter')(vm.users, {id: id});
//             if (filtered.length) {
//               filtered[0].isDeleted = true;
//             }
//           };

//           // cancel all changes
//           vm.cancel = function() {
//             for (var i = vm.users.length; i--;) {
//               var user = vm.users[i];
//               // undelete
//               if (user.isDeleted) {
//                 delete user.isDeleted;
//               }
//               // remove new 
//               if (user.isNew) {
//                 vm.users.splice(i, 1);
//               }
//             }
//           };

//           // save edits
//           vm.saveTable = function() {
//             var results = [];
//             for (var i = vm.users.length; i--;) {
//               var user = vm.users[i];
//               // actually delete user
//               if (user.isDeleted) {
//                 vm.users.splice(i, 1);
//               }
//               // mark as not new 
//               if (user.isNew) {
//                 user.isNew = false;
//               }

//               // send on server
//               // results.push($http.post('/saveUser', user));
//               console.log('Saving Table...');
//             }

//             return $q.all(results);
//           };

//         }
//     }
// })();
