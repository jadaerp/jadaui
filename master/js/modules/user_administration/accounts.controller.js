(function() {
    'use strict';

    angular
        .module('app.useradministration')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$scope','$rootScope', '$http', '$stateParams', '$state', '$uibModal', '$log', 'UserAccountService'];
        function AccountsController($scope, $rootScope, $http, $stateParams, $state, $uibModal, $log,UserAccountService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {


 var SuccessMsg;
 var errorMsg;
  $scope.accounts=UserAccountService.query();
console.log( $scope.accounts);

 $scope.loadUserAcconts = function () {
     
 $scope.accounts=UserAccountService.query();

}
 $rootScope.$on("CallLoadUserAcconts", function(){
           $scope.loadUserAcconts();
        });




//$scope.oneuser=CompanyInfoService.get({user:1}); //Obtain the Post from backend. Search by Id

  $scope.chequeInfo = [
    {chqNo: 1, custName : 'Bikash', status : 'active'},
    {chqNo: 2, custName : 'Bikash', status : 'active'},
    {chqNo: 3, custName : 'Bikash', status : 'active'},
    {chqNo: 4, custName : 'Bikash', status : 'active'},
    {chqNo: 5, custName : 'Bikash', status : 'cancelled'}
  ];

 
  $scope.onChqChange = function(code) {
    $scope.accounts.code = code;
    angular.forEach(  $scope.accounts, function() {
      if(code) {
        alert('This code already exists');
         $scope.chqNo='';
      }
    });
 };


  $scope.delete= function (account) {
account.$remove().then(function () {
$scope.loadUserAcconts();
});
}




   $scope.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: 'newUserAccount.html',
              controller: ModalOpenAccountsInstanceCtrl,
              size: size
            });





            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };



 $scope.show = function(account) {

      var modalInstance = $uibModal.open({
        templateUrl: 'EditUserAccount.html',
        controller: ModalInstanceCtrl,
        resolve: {
           account: function () {
             return account;
           }
         }        

      });
    };


// $scope.show = function(x) {
//     $scope.x = x;
//     var modalInstance = $uibModal.open({
//       templateUrl: 'edit-user-setting.html',
//       controller: ModalInstanceCtrl,
//       scope : $scope
//     });
//   };

           

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

             ModalOpenAccountsInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','UserAccountService'];
          function ModalOpenAccountsInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, UserAccountService) {


            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };


              $scope.account=new UserAccountService();
             $scope.submitUserAccount=function(accountform) {
              console.log('hellow');
          $scope.account.$save().then(function(data){
              var response=angular.fromJson(data);
          
            if(response.Status=="1"){
              $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
            }else{
           
               $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
           
            }
           
                $rootScope.$emit("CallLoadUserAcconts", {});
                $scope.accountReset(accountform);
          },

           function() {
             $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
        
          };
$scope.accountReset=function(accountform){
             $scope.accountform={};
            $scope.account="";
            accountform.$setPristine();
            };

             $scope.submitUserAccountClose=function() {
          $scope.account.$save().then(function(){
            
                $rootScope.$emit("CallLoadUserAcconts", {});
                $scope.ok();
          },
          
           function() {
                $scope.SuccessMsg=false;
                 $scope.errorMsg = 'Server Request Error';
                });
        
          };
          
         
          }
  

          
  ModalInstanceCtrl.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance','UserAccountService','account'];
          function ModalInstanceCtrl($scope,$rootScope, $http, $uibModalInstance, UserAccountService,account) {
            // $scope.currentgroup=user;
    var id=account.id;
    console.log(id);

            $scope.account=UserAccountService.get({id:id});
            console.log ($scope.account);

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          
         


                $scope.updateUserAccount=function(account){
            account.$update().then(function(data){
                   var response=angular.fromJson(data);
            console.log($scope.leave);
            // $scope.authMsg=response.Message;
            if(response.Status=="1"){
                     $scope.errorMsg=false;
                    $scope.SuccessMsg =response.Message;
                     $scope.user=UserAccountService.get({id:id});
            }else{
           
                  $scope.SuccessMsg=false;
                   $scope.errorMsg=response.Message;
          
            }
             $rootScope.$emit("CallLoadUserAcconts", {});
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