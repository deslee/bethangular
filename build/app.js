'use strict';

angular.module('beth-gulp-ng', [
    'beth-gulp-ng-main',
    'beth-gulp-ng-models',
    'testTodo'])
    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });
'app controller goes here';
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
/**
 * Created by desmond on 5/31/2014.
 */
angular.module('beth-gulp-ng-models', ['ngResource']).factory('Image', function ($resource) {
    var Image = $resource('/api/images/:id', { id: '@_id'});
    return Image
});
'use strict';

(function () {
    angular.module('beth-gulp-ng-main', [
        'ngRoute', 'ngAnimate', 'beth-gulp-ng-admin',
        'templates',
        'ng.picturefill', 'ui.bootstrap'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'main/main.html',
                    controller: 'MainCtrl'
                })
                .when('/entry/:slug', {
                    templateUrl: 'main/entry.html',
                    controller: 'EntryCtrl'
                });
        })
        .controller('MainCtrl', ['$scope', 'Image', function ($scope, Image) {
            $scope.featuredImages = Image.query(function () {
                console.log($scope.featuredImages);
            });
        }])
        .controller('EntryCtrl', function ($scope, $routeParams, Image) {
            var slug = $routeParams.slug;
            $scope.image = Image.get({slug: slug}, function () {
                console.log($scope.image);
            });
        });
})();

angular.module('testTodo', ['ngResource'])
    .controller('TodoCtrl', ['$scope', '$resource', function ($scope, $resource) {
        var Todo = $resource('/api/todos/:id', { id: '@_id' });
        console.log(Todo);
        $scope.todos = Todo.query();
        console.log($scope.todos);

        $scope.addTodo = function () {
            var todo = new Todo();
            todo.text = $scope.todoText;
            todo.$save(function () {
                $scope.todos.push(todo);
            });

            $scope.todoText = '';
        };
        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };
        $scope.save = function (item) {
            item.done = true;
            item.$save();
        };
        $scope.archive = function () {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) {
                    $scope.todos.push(todo);
                }
            });

            Todo.delete({ done: true });
        };
    }]).config(function ($routeProvider) {
        $routeProvider
            .when('/todo', {
                templateUrl: 'test_todo/todo.html'
            });
    });
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