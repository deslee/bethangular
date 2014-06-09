var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('scripts', function(){
    //combine all js files of the app
    gulp.src(['!./app/**/*_test.js','./app/**/*.js'])
//        .pipe(plugins.jshint())
//        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('templates',function(){
    //combine all template files of the app into a js file
    gulp.src(['!./app/index.html',
        './app/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('css', function(){
    gulp.src('./app/**/*.css')
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest('./build'));
});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src(['!./bower_components/**/*.min.js',
        './bower_components/underscore/underscore.js',
        './bower_components/jquery/dist/*.js',
        './bower_components/jquery.cookie/*.js',
        './bower_components/jquery-placeholder/*.js',
        './bower_components/angular/*.js',
        './bower_components/bootstrap/dist/js/*.js',
        './bower_components/bootstrap/js/tooltip.js',
        './bower_components/bootstrap/js/*.js',
        './bower_components/angular-route/*.js',
        './bower_components/angular-animate/*.js',
        './bower_components/angular-resource/*.js',
        './bower_components/restangular/dist/*.js',
        './bower_components/angular-bootstrap/*.js',
        './bower_components/isotope/jquery.isotope.js',
        './bower_components/imagesloaded/imagesloaded.pkgd.js',
        './bower_components/picturefill/*.js',
        './bower_components/angular-picturefill/*.js'])
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    gulp.src([
        './bower_components/bootstrap/dist/css/*.min.css'])
        .pipe(plugins.concat('lib.css'))
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-index', function() {
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-imgs', function() {
    gulp.src('./app/img/*')
        .pipe(gulp.dest('./build/img'));
});

gulp.task('copy-bootstrap-fonts', function() {
    gulp.src('./bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('watch',function(){
    gulp.watch([
        'build/**/*.html',        
        'build/**/*.js',
        'build/**/*.css'        
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js','!./app/**/*test.js'],['scripts']);
    gulp.watch(['!./app/index.html','./app/**/*.html'],['templates']);
    gulp.watch('./app/**/*.css',['css']);
    gulp.watch('./app/index.html',['copy-index']);

});

gulp.task('connect', plugins.connect.server({
    root: ['build'],
    port: 9000,
    livereload: true
}));

gulp.task('default',['connect','scripts','templates','css','copy-index','copy-imgs','copy-bootstrap-fonts','vendorJS','vendorCSS','watch']);