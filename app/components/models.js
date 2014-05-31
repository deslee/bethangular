/**
 * Created by desmond on 5/31/2014.
 */
angular.module('beth-gulp-ng-models', ['ngResource']).factory('Image', function ($resource) {
    var Image = $resource('/api/images/:slug', { id: '@slug'});
    return Image
});