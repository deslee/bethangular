'use strict';

angular.module('beth-gulp-ng-main', ['ngRoute', 'beth-gulp-ng-entityservice',
    'template/modal/window.html', 'template/modal/backdrop.html', ])
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
    .controller('MainCtrl', function ($scope, $modal, entries) {
        $scope.featuredItems = entries;
    })
    .controller('EntryCtrl', function ($scope, $routeParams, entries) {
        $scope.entry = _.findWhere(entries, {slug: $routeParams['slug']})
    });
