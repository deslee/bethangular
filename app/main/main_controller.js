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
        $scope.detail = function (image) {
            var modalInstance = $modal.open({
                templateUrl: 'main/entry.html',
                controller: 'EntryCtrl',
                backdrop: true,
                resolve: {
                    image: function () {
                        return image;
                    }
                }
            })
        }
    })
    .controller('EntryCtrl', function ($scope, $routeParams, $modalInstance, image) {
        $scope.entry = image;
        $scope.close = function () {
            $modalInstance.close();
        };
    });
