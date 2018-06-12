
(function() {
    'use strict';

    angular
        .module('app.employees')
        .controller('UserInfo', function($scope, $http, $uibModal, $log, UserService) { 
                
    
         $scope.users=UserService.query();

         $scope.setDataForUsers=function(userId) {
        $scope.oneUser=UserService.get({user:userId});

         };

      $scope.searchEmp=function(userId) {
     $scope.oneUser=UserService.get({user:userId});
 
            };

          $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        users: function () {
          return $scope.users;
        },
        user: function(){
          return size;
        }
      }
    });

  };

          $scope.show = function (size) {

    var modalInstance = $uibModal.open({  
      templateUrl: 'ModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    
    });

  };
         
    });
})();




(function() {
    'use strict';

    angular
        .module('app.employees')
        .controller('ModalInstanceCtrl',['$scope', '$uibModalInstance', 'users', 'user', function($scope, $uibModalInstance, users, user) { 
                
         console.log(user);
  $scope.user = user;
  
  $scope.users = users;
  $scope.selected = {
   user: $scope.users[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.user);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
         
    }]);
})();

