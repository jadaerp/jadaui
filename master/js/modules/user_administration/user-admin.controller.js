(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .controller('UserAdminController', UserAdminController);

    UserAdminController.$inject = ['$scope','$rootScope', '$http', '$stateParams', '$state', '$uibModal', '$log', 'userAdminService'];
        function UserAdminController($scope, $rootScope, $http, $stateParams, $state, $uibModal, $log,userAdminService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


 var SuccessMsg;
 var errorMsg;
  $scope.users=userAdminService.query();


 $scope.loadUsers = function () {
     
$scope.users=userAdminService.query();

}
 $rootScope.$on("CallLoadUsers", function(){
           $scope.loadUsers();
        });




  $scope.delete= function (user) {
user.$remove().then(function () {
$scope.loadUsers();
});
}




   $scope.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'NewUser.html',
              controller: ModalOpenUserInstanceCtrl,
              size: size
            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };



 $scope.show = function(user) {

      var modalInstance = $uibModal.open({
        templateUrl: 'EditUser.html',
        controller: ModalInstanceCtrl,
        resolve: {
           user: function () {
             return user;
           }
         }        

      });
    };




           

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

             ModalOpenUserInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','userAdminService'];
          function ModalOpenUserInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, userAdminService) {


            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };


              $scope.user=new userAdminService();
             $scope.submitUser=function(userform) {
              console.log();
          $scope.user.$save().then(function(data){
              var response=angular.fromJson(data);
          
            if(response.Status=="1"){
              $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
           
               $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
           
            }
           
                $rootScope.$emit("CallLoadUsers", {});
                $scope.userReset(userform);
          },

           function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
        
          };
$scope.userReset = function(userform){
             $scope.userform={};
            $scope.user="";
            userform.$setPristine();
            };

             $scope.submitUserClose=function() {
          $scope.user.$save().then(function(){
            
                $rootScope.$emit("CallLoadUsers", {});
                $scope.ok();
          },
          
           function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
        
          };
          
         
          }
  

          
  ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','userAdminService','user'];
          function ModalInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, userAdminService,user) {
            // $scope.currentgroup=user;
    var id=user.id;
    console.log(id);

            $scope.user=userAdminService.get({id:id});

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          
         


                $scope.updateUser=function(user){
            user.$update().then(function(data){
                   var response=angular.fromJson(data);
         
            // $scope.authMsg=response.Message;
            if(response.Status=="1"){
                     $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
                     $scope.user=userAdminService.get({ID:id});
            }else{
           
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
          
            }
             $rootScope.$emit("CallLoadUsers", {});
            }, function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                }
            );
          
              };
          }


          

        }
    }

})();