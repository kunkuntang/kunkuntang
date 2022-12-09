const { src, dest } = require('gulp');

const htmlmin = require('gulp-htmlmin')
// const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const pump = require('pump')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const data = require('gulp-data')
const template = require('gulp-template')
const preprocess = require("gulp-preprocess");
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const override = require('gulp-rev-css-url');
const clean = require('gulp-clean')

const fs = require('fs')
const path = require('path')

const revCssSrc = './src/css/revCss'

function buildRevCss() {
  src(['./rev/img/**/*.json', revCssSrc + '/*.css'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        '/img': '/img',
      },
    }))
    .pipe(dest('dist/css'))
    .on('end', cleanRevCss);
}

function cleanRevCss() {
  src(revCssSrc, { read: false, allowEmpty: true })
    .pipe(clean());
}

function buildProdCss(cb) {
  // console.log('buildProdCss')
  src('./src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(rev())
    .pipe(override())
    .pipe(dest(revCssSrc))
    .pipe(rev.manifest())
    .pipe(dest('rev/css'))
    .on('end', buildRevCss)
  cb()
}

function buildProdJs(cb) {
  pump([
    src(['src/sw.js', 'src/sw-register.js'])
      .pipe(preprocess({ context: { NODE_ENV: process.env.NODE_ENV || 'development' } }))
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(dest('dist/')),
    src(['src/js/*.js'])
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(rev())
      .pipe(dest('dist/js'))
      .pipe(rev.manifest())
      .pipe(dest('rev/js')),
  ])
  cb();
}

function buildProdHtml(cb) {
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
        './js': './js',
        './img': './img',
        './plugins': './plugins',
      },
      extMap: {
        '.scss': '.css',
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
  cb();
}

function buildProdFont(cb) {
  src('src/font/**/*')
    .pipe(dest('dist/font'))
  cb();
}

function buildProdImage(cb) {
  src('src/img/*')
    // .pipe(imagemin())
    .pipe(rev())
    .pipe(dest('dist/img'))
    .pipe(rev.manifest())
    .pipe(dest('rev/img'))
    cb();
}

function moveProdPlugins(cb) {
  src('src/plugins/**/*')
    .pipe(rev())
    .pipe(dest('dist/plugins'))
    .pipe(rev.manifest())
    .pipe(dest('rev/plugins'))
  cb()
}

exports.default = {
  buildProdJs,
  buildRevCss,
  cleanRevCss,
  buildProdCss,
  buildProdHtml,
  buildProdImage,
  buildProdFont,
  moveProdPlugins,
}