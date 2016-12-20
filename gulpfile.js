// include gulp
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Individual tasks
gulp.task('clean', require('./gulp-tasks/clean'));
gulp.task('html', require('./gulp-tasks/html'));
gulp.task('javascript', require('./gulp-tasks/javascript'));
gulp.task('watch', require('./gulp-tasks/watch'));

// Globs
gulp.task('cln', ['clean']);
gulp.task('devl', ['html', 'javascript', 'watch']);

// Default task
gulp.task('default', ['devl']);
