'use strict';

angular.module('beth-gulp-ng', [
    'beth-gulp-ng-main',
    'testTodo'])
    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });