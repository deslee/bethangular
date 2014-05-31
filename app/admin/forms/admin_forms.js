/**
 * Created by desmond on 5/31/2014.
 */
angular.module('beth-gulp-ng-admin-forms', [])
    .controller('AdminImageCtrl', function ($scope) {
        if (!$scope.urls) {
            $scope.urls = [];
        }

        if ($scope.image && (!$scope.image.urls || $scope.image.urls.length == 0)) {
            $scope.image.urls = ['']
        }

        $scope.addImage = function () {
            $scope.image.urls.push('');
        };

        $scope.save = function () {
            console.log($scope.image);
            $scope.image.$save(function () {
                $scope.$emit('imageSaved', $scope.image);
            });
        }
    }).directive('adminImage', function () {
        return {
            scope: {
                'image': '='
            },
            link: function (scope) {
            },
            restrict: 'E',
            templateUrl: 'admin/forms/image_form.html',
            controller: 'AdminImageCtrl'
        }
    });