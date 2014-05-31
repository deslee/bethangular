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
/**
 * Created by desmond on 5/31/2014.
 */
angular.module('beth-gulp-ng-models', ['ngResource']).factory('Image', function ($resource) {
    var Image = $resource('/api/images/:slug', { id: '@slug'});
    return Image
});
'use strict';

(function () {
    angular.module('beth-gulp-ng-main', [
        'ngRoute', 'ngAnimate', 'beth-gulp-ng-admin',
        'templates',
        'ng.picturefill'])
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