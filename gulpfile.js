const { watch, src, dest, series, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const pump = require('pump')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps')
const data = require('gulp-data')
const template = require('gulp-template')
const gulpSequence = require('gulp-sequence')
const preprocess = require("gulp-preprocess");
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const override = require('gulp-rev-css-url');
const browserSync = require('browser-sync')
const reload = browserSync.reload

const fs = require('fs')
const path = require('path')

function buildCss(cb) {
  src('./src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(rev())
    // .pipe(override())
    .pipe(dest('dist/css'))
    .pipe(rev.manifest())
    .pipe(dest('rev/css'))
    .pipe(reload({ stream: true }))
  cb();
}

function buildJs(cb) {
  pump([src(['src/sw.js', 'src/sw-register.js'])
    .pipe(preprocess({ context: { NODE_ENV: process.env.NODE_ENV || 'development' } }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify()),
    sourcemaps.write('./'),
    dest('dist/'),
    src(['src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify()),
    sourcemaps.write('./'),
    dest('dist/js'),
    reload({ stream: true })
  ])
  cb();
}

function buildHtml(cb) {
  src(['rev/**/*.json','src/*.html'])
    .pipe(data(function(file) {
      const filePath = './src/' + path.basename(file.path) + '.json'
      if(fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath));
      } else {
        return {}
      }
    }))
    .pipe(template())
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        './css': './css',
        // './js': '/dist/js',
        './plugins': './plugins',
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }))
  cb();
}

function buildFont(cb) {
  src('src/font/**/*')
    .pipe(dest('dist/font'))
  cb();
}

function buildImage(cb) {
  src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
  cb();
}

function movePlugins(cb) {
  src('src/plugins/**/*')
    .pipe(rev())
    .pipe(dest('dist/plugins'))
    .pipe(rev.manifest())
    .pipe(dest('rev/plugins'))
  cb()
}

function buildClean(cb) {
  return src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
  cb();
}


function watchTask(cb) {
  watch('./src/js/**/*.js', ['build:js', 'move:plugins']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  watch('./src/css/**/*.scss', ['build:css']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  watch('./src/**/*.html', ['build:html']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  cb();
}

// 监视文件改动并重新载入
function serverTask() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  watch('./src/*.html', buildHtml)
  watch(['./src/css/**/*.css', './src/css/**/*.scss'], buildCss)
  watch('./src/**/*.js', buildJs, movePlugins)
}

const buildTask = parallel(buildCss, series(buildHtml), buildJs, buildImage, buildFont, movePlugins);
const defaultTask = series(buildClean, buildTask);

exports.build = series(buildTask);
exports.clean = series(buildClean);
exports.watch = series(parallel(buildTask), watchTask);
exports.server = series(defaultTask, serverTask);
exports.default = defaultTask;