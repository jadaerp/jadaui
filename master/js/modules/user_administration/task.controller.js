(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .controller('TasksController', TasksController);

    TasksController.$inject = ['$scope','$rootScope', '$http', '$stateParams', '$state','$uibModal', '$log', 'TaskService'];
        function TasksController($scope, $rootScope, $http, $stateParams, $state,$uibModal, $log, TaskService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

 var SuccessMsg;
 var errorMsg;

         
 $scope.tasks=TaskService.query();

 $scope.loadTasks = function () {
     
 $scope.tasks=TaskService.query();
   }

 $rootScope.$on("CallLoadTasks", function(){
           $scope.loadTasks();
        });




//$scope.oneuser=CompanyInfoService.get({user:1}); //Obtain the Post from backend. Search by Id




  $scope.delete= function (task) {
task.$remove().then(function () {
$scope.loadTasks();
});
}




   $scope.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'newTask.html',
              controller: ModalOpenTaskInstanceCtrl,
              size: size
            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };





    


      $scope.show = function(task) {
        var modalInstance = $uibModal.open({
        templateUrl: 'EditTask.html',
        controller: ModalInstanceCtrl,
        resolve: {
           task: function () {
             return task;
           }
         }        

      });
    };


;
//   };

           

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalOpenTaskInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','TaskService'];
          function ModalOpenTaskInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, TaskService) {


            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };


              $scope.task=new TaskService();
             $scope.submitTask=function(taskform) {
          $scope.task.$save().then(function(data){
            var response=angular.fromJson(data);
          
            if(response.Status=="1"){
              $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
           
               $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
           
            }
           
                $rootScope.$emit("CallLoadTasks", {});
                  $scope.taskReset(taskform);
          },
           function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
        
          };
  $scope.taskReset=function(taskform){
             $scope.taskform={};
            $scope.task="";
            taskform.$setPristine();
            };
           $scope.closeTask=function() {
          $scope.task.$save().then(function(){
           
                $rootScope.$emit("CallLoadTasks", {});
                $scope.ok();
          },function() {
                 $scope.errorMsg = 'Server Request Error';
                });
        
          };
          
          
         
          }



          ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','TaskService','task'];
          function ModalInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, TaskService,task) {
            $scope.currenttask=task;


            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          
         


                $scope.updateTask=function(currenttask){
             currenttask.$update().then(function(){
                 $rootScope.$emit("CallLoadTasks", {});
            });
          
              };
          }
        }
    }

})();