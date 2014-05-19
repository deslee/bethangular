'use strict';

angular.module('beth-gulp-ng', [ 'ngRoute','beth-gulp-ng-main','templates' ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });