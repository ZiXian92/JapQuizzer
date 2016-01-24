var gulp = require('gulp');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

gulp.task('default', ['compile-less', 'compile-js'], function(){

});

gulp.task('compile-less', function(){
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('compile-js', function(){
  return gulp.src('./js/app.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename('compiled.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch(['./less/*.less', './js/*.jsx', './js/*.js'], 'default');
});
