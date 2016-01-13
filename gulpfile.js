var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var transform   = require('vinyl-transform');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var reload      = browserSync.reload;

gulp.task('default', function(){

});

// Little help from https://egghead.io/lessons/javascript-gulp-and-browserify-initial-setup
gulp.task('browserify', function(){
  return browserify('js/main.js')
    .bundle()
    .on('error', function(){
      console.log('ca foire' +  e);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('script', function(){
  return gulp.src('js/main.js')
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
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

  gulp.watch(['js/main.js'],['browserify']);
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch(['*.html', 'templates/**/*.html', 'js/**/*.js', 'css/*.css'], {cwd: '.'}, reload);

});
