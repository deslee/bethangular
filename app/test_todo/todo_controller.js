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