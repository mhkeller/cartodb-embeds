var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

var paths = {
	js: [
		'bower_components/cartodb.js/cartodb.js',
		'src/cartodb-embeds.js'
	]
};

// These tasks are currently duplicative in parts and the cartodjs is coming out with odd linebreaks, not sure why

gulp.task('make-js-pkg', function() {
  return gulp.src(paths.js)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(uglify({
    	preserveComments: 'some'
    }))
    .pipe(concat('cartodb-embeds.pkgd.min.js')) // The file to write out
    // .pipe(sourcemaps.write('./')) // Write these in the same folder as our `dest` in the line below
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-embed', function() {
  return gulp.src(paths.js[1])
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(uglify({
    	mangle: true,
    	compress: true,
    	preserveComments: 'some'
    }))
    // .pipe(sourcemaps.write('./')) // Write these in the same folder as our `dest` in the line below
    .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['make-js-pkg', 'compile-embed']);
});


gulp.task('default', ['make-js-pkg', 'compile-embed']); // Simply compile
gulp.task('dev',   ['watch', 'make-js-pkg', 'compile-embed']); // Watch files for changes