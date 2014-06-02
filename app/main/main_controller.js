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
            $scope.featuredImages = Image.getList().$object;
        }])
        .controller('EntryCtrl', function ($scope, $routeParams, Image) {
            var slug = $routeParams.slug;
            Image.query({slug: slug}, function (result) {
                $scope.image = result[0];
            });
        });
})();
