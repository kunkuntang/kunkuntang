const { watch, src, dest, series, parallel } = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');
const browserSync = require('browser-sync')
const clean = require('gulp-clean')

const { buildDevJs, buildDevCss, buildDevHtml, buildDevImage, buildDevFont, moveDevPlugins } = tasks.dev.default
const { buildProdJs, buildProdCss, buildRevCss, cleanRevCss, buildProdHtml, buildProdImage, buildProdFont, moveProdPlugins } = tasks.prod.default

console.log(buildDevCss)

function buildClean(cb) {
  return src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
  cb();
}

// 监视文件改动并重新载入
function serverTask() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  watch('./src/*.html', buildDevHtml)
  watch(['./src/css/**/*.css', './src/css/**/*.scss'], buildDevCss)
  watch('./src/**/*.js', buildDevJs)
  watch(['./src/plugins/**/*.js', './src/plugins/**/*.css'], moveDevPlugins)
}


const buildDevTask = parallel(buildDevCss, buildDevHtml, buildDevJs, buildDevImage, buildDevFont, moveDevPlugins);
const buildProdTask = parallel(
  buildProdCss,
  buildProdHtml,
  buildProdJs,
  buildProdImage,
  buildProdFont,
  moveProdPlugins
);

exports.buildDev = series(buildClean, buildDevTask);
exports.buildProd = series(buildClean, buildProdTask);
exports.clean = series(buildClean);
exports.server = series(buildClean, buildDevTask, serverTask);
exports.default = buildClean;
exports.cleanRevCss = cleanRevCss;
