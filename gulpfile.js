// gulpfile.js


// Initialize modules
const gulp = require('gulp');
// Importing all the Gulp-related packages we want to use
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
//const browserSync = require('browser-sync');
//const server = browserSync.create();
const child = require('child_process');
const gutil = require('gulp-util');
const sassGlob = require('gulp-sass-glob');
const webpack = require('webpack-stream');

// File paths
const files = { 
    scssPath: '_includes/beatrice/**/*.scss',
    jsPath: '_includes/beatrice/**/*.js',
    js3rdPartyPath: 'third_party/**'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
  return gulp.src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(gulp.dest('assets/css')); // put final CSS in assets folder
}

// JS task: compiles JS files into main.js
function jsTask(){    
  return gulp.src(files.jsPath)
      .pipe(webpack())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('assets/js')); // put final JS in assets folder
}

function js3rdPartyTask(){    
  return gulp.src(files.js3rdPartyPath)
      .pipe( gulp.dest('assets/js') ); // put final 3rd party JS in assets folder
}
// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
  gulp.watch([files.scssPath, files.jsPath], gulp.series(scssTask, jsTask, jekyllBuild));    
  gulp.watch(
    [
      './_layouts/**/*',
      './_pages/**/*',
      './_posts/**/*'
    ], gulp.series(jekyllBuild))
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

function jekyllBuild(done) {
  const jekyll = child.spawn('bundle', ['exec',
    'jekyll',
    'build'
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
exports.default = gulp.series(
    scssTask,
    jsTask, 
    js3rdPartyTask, 
    jekyll,
    watchTask
);