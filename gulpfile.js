const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const prefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();

function buildStyles() {
  return src('./src/*.scss')
    .pipe(prefixer('last 2 versions'))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src'));
};


function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch('*.html', browserSyncReload);
  watch('./src/*.js', browserSyncReload);
  watch('./src/*.scss', series(buildStyles, browserSyncReload));
}

exports.default = series(buildStyles, browserSyncServe, watchTask);