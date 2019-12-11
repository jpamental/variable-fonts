// gulpfile.js


// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const server = browserSync.create();
const child = require('child_process');
const gutil = require('gulp-util');
const sassGlob = require('gulp-sass-glob');
const webpack = require('webpack-stream');

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

// File paths
const files = { 
    scssPath: '_includes/beatrice/styles.scss',
    jsPath: '_includes/beatrice/**/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(done){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sassGlob())
        .pipe(sass({
          includePaths: ['node_modules']
        }))
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('assets/css')
    ); // put final CSS in dist folder
    done();
  }

// JS task: compiles JS files into main.js
function jsTask(done){    
  return src(files.jsPath)
      .pipe(webpack())
      .pipe(concat('main.js'))
    .pipe(dest('assets/js')
  ); // put final CSS in dist folder
  done();
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath], 
        parallel(scssTask), reload);    
}

function jekyll(done) {
  const jekyll = child.spawn('bundle', ['exec',
    'jekyll',
    'serve'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
  done();
};

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask), 
    parallel(jsTask), 
    //serve, 
    jekyll,
    watchTask
);