var path = require('path');
var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var origin = 'bower_components';
var destinationJS = path.join('ui', 'lib');
var destinationCSS = path.join('ui', 'css');

gulp.task('moveDeps', function() {
    // angular
    gulp.src(path.join(origin, 'angular', 'angular.js'))
    .pipe(gulp.dest(destinationJS));
    
    // angular-animate
    gulp.src(path.join(origin, 'angular-animate', 'angular-animate.js'))
    .pipe(gulp.dest(destinationJS));
    
    // angular-aria
    gulp.src(path.join(origin, 'angular-aria', 'angular-aria.js'))
    .pipe(gulp.dest(destinationJS));

    // angular-router
    gulp.src(path.join(origin, 'angular-route', 'angular-route.js'))
    .pipe(gulp.dest(destinationJS));

    // ngstorage
    gulp.src(path.join(origin, 'ngstorage', 'ngStorage.js'))
    .pipe(gulp.dest(destinationJS));
    
    // angular-material
    gulp.src(path.join(origin, 'angular-material', 'angular-material.js'))
    .pipe(gulp.dest(destinationJS));
    gulp.src(path.join(origin, 'angular-material', 'angular-material.css'))
    .pipe(gulp.dest(destinationCSS));
    
    // angular-messages
    gulp.src(path.join(origin, 'angular-messages', 'angular-messages.js'))
    .pipe(gulp.dest(destinationJS));
});

gulp.task('buildProd', function() {
    gulp.src('ui/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('www'));
    
    gulp.src('ui/icons/*')
    .pipe(gulp.dest('www/icons'));

    gulp.src('ui/views/*')
    .pipe(gulp.dest('www/views'));
});