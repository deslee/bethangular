'use strict';

angular.module('beth-gulp-ng', [ 'ngRoute', 'ngAnimate',
    'beth-gulp-ng-main',
    'beth-gulp-ng-directives',
    'ng.picturefill',
    'mm.foundation',
    'templates' ])
    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });