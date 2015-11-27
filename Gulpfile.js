var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    concatCss = require("gulp-concat-css"),
    minifyCss = require('gulp-minify-css');

var browserSync = require('browser-sync');

var reload = function(){
  setTimeout(function(){
    browserSync.reload();
  },300);
};

gulp.task("move", function(){
    gulp.src([
      "./dev/**/**.html",
      "./dev/**/**.png",
      "./dev/**/**.jpg",
      "./dev/**/**.gif",
      "./dev/**/**.svg"
    ]).pipe(gulp.dest('./app'))
});

//dev
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['./app/'],
    }
  });
  gulp.watch('./dev/style/**/*.scss', ["styles",reload]);
  gulp.watch('./dev/**/*.html', ["move",reload]);
  //gulp.watch('dev/javascript/**/*.js');
 // gulp.watch('dev/images/**/*.js');
});


gulp.task('styles', function () {
  return gulp.src([
      './dev/style/main.scss'
    ])
    .pipe(sass())
  //  .pipe(minifyCss())
    .pipe(gulp.dest('./app/style/'))
});
//
gulp.task('clean', function() {
  return gulp.src('./app')
        .pipe(clean({force: true}))
});

gulp.task("generate", ['styles', 'move']);

gulp.task("build", ["clean"], function(){
  gulp.run('generate');
});

gulp.task('default', ['build'], function () {
    gulp.run('browser-sync');
});
