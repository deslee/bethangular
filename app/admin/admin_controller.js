angular.module('beth-gulp-ng-admin', [
    'ngRoute'
]).config(function($routeProvider) {
    $routeProvider
        .when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        })
}).controller('AdminImageCtrl', function($scope) {
    var image = $scope.image;
    if (!$scope.urls) {
        $scope.urls = [];
    }

    $scope.addImage = function() {
        image.urls.push('');
    };

    $scope.submit = function() {
        image.$save();
    }
}).controller('AdminCtrl', function($scope, Image) {
    var images = $scope.images = Image.query();
}).directive('adminImage', function() {
    return {
        scope: {
            'image': '='
        },
        link: function() {
        },
        restrict: 'E',
        templateUrl: 'admin/image.html',
        controller: 'AdminImageCtrl'
    }
});