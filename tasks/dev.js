const { src, dest } = require('gulp');

const pump = require('pump')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const data = require('gulp-data')
const template = require('gulp-template')
const preprocess = require("gulp-preprocess");
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
    .pipe(dest('dist/css'))
    .pipe(reload({ stream: true }))
  cb();
}

function buildJs(cb) {
  pump([
    src(['src/sw.js', 'src/sw-register.js'])
      .pipe(preprocess({ context: { NODE_ENV: process.env.NODE_ENV || 'development' } }))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(dest('dist/')),
    src(['src/js/*.js'])
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(dest('dist/js')),
    reload({ stream: true })
  ])
  cb();
}

function buildHtml(cb) {
  src(['src/*.html'])
    .pipe(data(function(file) {
      const filePath = './src/' + path.basename(file.path) + '.json'
      if(fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath));
      } else {
        return {}
      }
    }))
    .pipe(template())
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
    .pipe(dest('dist/img'))
  cb();
}

function movePlugins(cb) {
  src('src/plugins/**/*')
    .pipe(dest('dist/plugins'))
  cb()
}

exports.default = {
  buildDevJs: buildJs,
  buildDevCss: buildCss,
  buildDevHtml: buildHtml,
  buildDevImage: buildImage,
  buildDevFont: buildFont,
  moveDevPlugins: movePlugins,
}