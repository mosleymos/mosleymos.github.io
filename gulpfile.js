var gulp  = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var reload = browserSync.reload;

gulp.task('default', function(){

});

gulp.task('sass', function(){
  return sass('./scss/main.scss')
    .pipe(gulp.dest('./css/main.css'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', function(){
  browserSync({
    server:{
      baseDir: '.'
    }
  });

  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch(['*.html', 'templates/**/*.html', 'js/**/*.js', 'css/*.css'], {cwd: '.'}, reload);

});
