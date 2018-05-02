var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var browserSync  = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');

//Error Logging
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}
//To use
//.on('error', errorLog)

//Styles Task
gulp.task('styles', function () {
 return sass('./scss/*.scss', {
//  style: 'compressed'
 })
  .pipe(autoprefixer())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({stream: true}));
});﻿

//Image Compression Task
// gulp.task('image', function () {
//  gulp.src('img/*')
//  .pipe(imagemin())
//  .pipe(gulp.dest('img/min'));
// });﻿

//Uglify Javascript Task
gulp.task('uglify', function () {
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./minjs'));
});﻿

//Browser Sync Task
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});


gulp.task('default', ['styles', 'uglify', 'serve']);
