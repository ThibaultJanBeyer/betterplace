var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var wiredep = require('wiredep').stream;
var size = require('gulp-size');
var fs = require('fs');

var htmlSrc = './src/**/*.html',
    htmlDst = './dist';

var htmlminOptions = {
  collapseWhitespace: true,
  removeComments: true
};

module.exports = function () {
  console.log('~~~~~~~~~~~ Flawless :-) ~~~~~~~~~');
  return gulp.src(htmlSrc)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(wiredep())
    .pipe(htmlhint())
    .pipe(htmlmin(htmlminOptions))
    .pipe(size({title: 'HTML'}))
    .pipe(gulp.dest(htmlDst));
};
