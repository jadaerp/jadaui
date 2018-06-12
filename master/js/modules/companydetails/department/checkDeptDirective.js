
(function() {
    'use strict';

    angular
        .module('app.companydetails')
        .directive('departmentavail', departmentavail);

    departmentavail.$inject = ['DeptAvailability'];
    function departmentavail(DeptAvailability) {
        var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.on('blur', function (evt) {
          
                if (!ngModel || !element.val()) return;
                var curValue = element.val();
 
                DeptAvailability.IsDeptAvailablle(curValue)
                .then(function (response) {
                        ngModel.$setValidity('unique', response);
                }, function () {
                    //If there is an error while executing AJAX
                    ngModel.$setValidity('unique', true);
                });
            });
        }
    }
     return directive;
       
    }

})();
