var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require("del"),
    concatCss = require("gulp-concat-css"),
    minifyCss = require('gulp-minify-css');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

//dev
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['./app/'],
    }
  });
  gulp.watch('dev/styles/**/*.scss', ["styles",reload]);
 // gulp.watch('dev/javascript/**/*.js');
 // gulp.watch('dev/images/**/*.js');
});


gulp.task('styles', function () {
  return gulp.src([
      './dev/style/main.scss'
    ])
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./app/style/'))
});
//
gulp.task('clean', function(cb) {
  del([ "./app"], cb);
});

gulp.task("build", ["clean"], function(cb){


});


gulp.task('default', ['build'], function () {
    gulp.run('browser-sync');
});
