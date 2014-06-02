/**
 * Created by desmond on 5/31/2014.
 */
angular.module('beth-gulp-ng-models', ['restangular'])
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    })
    .factory('Image', function (Restangular) {
        var images = Restangular.all('images');
        return images
    });