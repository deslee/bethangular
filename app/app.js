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