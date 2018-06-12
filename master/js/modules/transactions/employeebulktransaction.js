
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('EmpBulkTransController', EmpBulkTransController);

    EmpBulkTransController.$inject = ['$scope','$http', '$uibModal','PayrollBatchPostingService','$stateParams', '$state','readFileData','jadaApiUrl'];
    function EmpBulkTransController($scope, $http,$uibModal, PayrollBatchPostingService,$stateParams, $state,readFileData,jadaApiUrl) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

$scope.fileDataObj = [];

            $scope.fileData ={ };
    
    $scope.uploadFile = function() {
      if ($scope.fileContent) {
        $scope.fileDataObj = readFileData.processData($scope.fileContent);
      
        // $scope.fileData = JSON.stringify($scope.fileDataObj);
         $scope.fileData =  $.parseJSON($scope.fileDataObj);

var jdata= JSON.stringify($scope.fileData);
        console.log( $scope.fileData);
      }
    }



            $scope.cancel = function () {
           
            $scope.fileData =' ';
            };



 $scope.save = function () {
var list=$scope.fileData;
$scope.res=[];
for(var r=0;r<list.length;r++){
  var vdata =list[r];
  console.log(vdata);
  // var postingdata = new PayrollBatchPostingService(vdata);
  var postingdata = new PayrollBatchPostingService(vdata);

    postingdata.$save().then(function(data){
                    var response=angular.fromJson(data);
                    $scope.res.push(data);
                    console.log(data);
                  },
                   function() {
                    
                    });

                        $scope.fileData=$scope.res;
    // $http.post(jadaApiUrl+'api/payrollsingleposting/', {vdata}).success(
    //   function(data){

    //         var response=angular.fromJson(data);
          
    //         if(response.Status=="1"){
    //           $scope.errorMsg=false;
    //                 $scope.SuccessMsg =response.Message;
    //                 console.log()
    //         }else{
           
    //            $scope.SuccessMsg=false;
    //                $scope.errorMsg=response.Message;
           
    //         }
    //     // $scope.fileData[r].success=true;
    //     // $scope.response = data
    //     // console.log(data);
    //   })

}

  }

        }
    }

})();

