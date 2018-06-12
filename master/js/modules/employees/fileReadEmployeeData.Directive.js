(function() {
    'use strict';

    angular
        .module('app.employees')
     .directive('employeeFileReaderDirective', function() {
 return {
        restrict: "A",
        scope: {
            employeeFileReaderDirective: "=",
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;
                        scope.$apply(function() {
                            scope.employeeFileReaderDirective = contents;
                        });
                    };
                    r.readAsText(files[0]);
                }
            });
        }
    };
});

})();