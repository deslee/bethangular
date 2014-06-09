'use strict';

(function () {
    angular.module('beth-gulp-ng-main', [
        'ngRoute', 'ngAnimate', 'beth-gulp-ng-admin',
        'templates', 'lbServices', 'ui.bootstrap'])
        .config(function ($routeProvider) {
        })
        .controller('MainCtrl', ['$scope', 'Entry', function ($scope, Entry) {
            $scope.featuredImages = Entry.find(function(response) {
            });
        }])
        .controller('EntryCtrl', function ($scope, $routeParams, Entry) {
            var slug = $routeParams.slug;
            Entry.find({slug: slug}, function (result) {
                $scope.image = result[0];
            });
        });
})();
