const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps')
const data = require('gulp-data')
const template = require('gulp-template')
const gulpSequence = require('gulp-sequence')
const browserSync = require('browser-sync')
const reload = browserSync.reload

const fs = require('fs')
const path = require('path')

gulp.task('build:css', () => {
  gulp.src('./src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({ stream: true }))
})

gulp.task('build:js', () => {
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({ stream: true }))
})

gulp.task('build:html', () => {
  gulp.src('src/*.html')
    // .pipe(template({ users: ['jack', 'tommi'] }))
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./src/' + path.basename(file.path) + '.json'));
    }))
    .pipe(template())
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }))
})

gulp.task('build:font', () => {
  gulp.src('src/font/**/*')
    .pipe(gulp.dest('dist/font'))
})

gulp.task('build:image', () => {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

gulp.task('build:clean', () => {
  return gulp.src('dist', { read: false })
    .pipe(clean());
})

gulp.task('build', gulpSequence(['build:css', 'build:html', 'build:js', 'build:image', 'build:font']))

gulp.task('default', gulpSequence('build:clean', 'build'))

gulp.task('watch', ['default'], () => {
  gulp.watch('./src/js/**/*.js', ['build:js']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('./src/css/**/*.scss', ['build:css']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('./src/**/*.html', ['build:html']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
})

// 监视文件改动并重新载入
gulp.task('server', ['default'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('./src/*.html', ['build:html'])
  gulp.watch(['./src/css/**/*.css', './src/css/**/*.scss'], ['build:css'])
  gulp.watch('./src/**/*.js', ['build:js'])
});