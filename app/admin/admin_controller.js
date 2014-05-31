angular.module('ng-bs-modals', [
    'template/modal/backdrop.html',
    'template/modal/window.html',
]);
angular.module('beth-gulp-ng-admin', [
    'ngRoute', 'ui.bootstrap', 'ng-bs-modals',
    'beth-gulp-ng-admin-forms',
]).config(function ($routeProvider) {
    $routeProvider
        .when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'AdminCtrl'
        })
}).controller('AdminCtrl', function ($scope, $modal, Image) {
    $scope.selected = {};
    $scope.$on('imageSaved', function (e, image) {
        if (!_.find(images, function (i) {
            return i._id == image._id
        })) {
            images.push(image);
        }
    });

    var images = $scope.images = Image.query();
    $scope.newImage = function () {
        $scope.editImage = new Image();
    };
    $scope.edit = function (image) {
//        var modalInstance = $modal.open({
//            templateUrl: 'admin/modal/image_modal.html',
//            controller: function($scope, image) {
//              $scope.image = image;
//            },
//            size: 'lg',
//            resolve: {
//                image: function() {
//                    return image;
//                }
//            }
//        });
        $scope.editImage = angular.copy(image);
    };
    $scope.deleteSelected = function () {
        var ids = _.filter(_.keys($scope.selected), function (k) {
            return $scope.selected[k]
        });
        var query = {
            '$or': _.map(ids, function (id) {
                return {
                    _id: id
                }
            })
        };
        console.log(query);
        Image.delete({query: JSON.stringify(query)}, function (response) {
            var old_images = _.filter(images, function(image) {
                return _.contains(ids, image._id);
            });
            console.log(old_images);
            $scope.images = _.difference(images, old_images);
        })
    }
});