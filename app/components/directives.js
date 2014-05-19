angular.module('beth-gulp-ng-directives', [])
    .directive('dataInterchange', function() {
        alert("AAAH");
       return {
           link: function(scope, element, attrs, ctrl) {
               alert('boo!')
           }
       }
    });