var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var minify = require('gulp-minify');
var rename = require("gulp-rename");
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

var config = require('./config');

// ------------------------ File locations and options

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};


// ------------------------ Gulp Tasks

gulp.task('buildStyleData', shell.task([
	// execute the build command for the DSS
	'node src/_styleguide/dssBuild'
]));


gulp.task('clean', function (cb) {
	// clear dist folder for new build
	return del([
		config.dist + '**/*',
	]);
	cb();
});


gulp.task('compileSite', shell.task([
	// compile the styleguide
	'node src/_styleguide/build'
]));


gulp.task('component-sass', function (cb) {
	// Compile the sass and autoprefix the CSS
	return gulp.src(config.componentSassFile)
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest(config.styleguideCssFolder));
	cb();
});


gulp.task('styleguide-sass', function (cb) {
	// Compile the sass and autoprefix the CSS
	return gulp.src(config.styleguideSassFile)
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest(config.styleguideCssFolder));
	cb();
});


gulp.task('styleguide-scriptConcat', function(cb) {
	// Concatinate all the scripts used for the styleguide
	return gulp.src(
		[config.styleguideJsFolder +'/vendor/jquery-2.2.3.min.js',
		config.styleguideJsFolder + '/vendor/beautify-html.js',
		config.styleguideJsFolder +'/vendor/prettify.js',
		config.styleguideJsFolder + '/src/styleguide-code-formatting.js',
		config.styleguideJsFolder + '/src/site-interactions.js'
		])
	.pipe(concat('styleguide-all.js'))
	.pipe(gulp.dest(config.styleguideJsFolder+'/dist/'));
	cb();
});


gulp.task('styleguide-scriptMinify', function(cb){
	// Minify the JS
	return gulp.src(config.styleguideJsFolder+'/dist/styleguide-all.js')
	.pipe(minify())
	.pipe(gulp.dest(config.styleguideJsFolder+'/dist/'));
	cb();
});


gulp.task('serve', function() {

	var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
	};

	 var debounceReload = debounce(function() {
	      reload();
	 }, 1000);

    browserSync.init({
        server: "dist"
    });

    gulp.watch(config.styleguideSassFilesAll, ['watchStyleguideSASS']);
		gulp.watch(config.srcHTML, ['watchHTML']);
		gulp.watch(config.componentsFolder+'**/*.scss', ['watchComponentSASS']);
		gulp.watch('dist/**/*').on('change', debounceReload);

});


//--------------------------  Sequencing Tasks


gulp.task('buildComponents', function(cb) {
		runSequence(
			'component-sass',
			cb
		);
});


gulp.task('buildStyleguideResources', function(cb) {
	runSequence(
		'styleguide-sass',
		'styleguide-scriptConcat',
		['buildStyleData', 'styleguide-scriptMinify'],
		cb);
});


gulp.task('build-all' , function(cb) {
	runSequence(
		'clean',
		'buildComponents',
		'buildStyleguideResources',
		'compileSite',
		'serve',
		cb);
});


gulp.task('rebuildSite' , function(cb) {
	runSequence(
		'buildComponents',
		'buildStyleguideResources',
		'compileSite',
		cb);
});



gulp.task('watchComponentSASS' , function(cb) {
	runSequence(
		'component-sass',
		'buildStyleData',
		'compileSite',
		cb);
});


gulp.task('watchHTML' , function(cb) {
	runSequence(
		'compileSite',
		cb);
});

gulp.task('watchStyleguideSASS' , function(cb) {
	runSequence(
		'buildStyleguideResources',
		'compileSite',
		cb);
});


gulp.task('default', function(cb) {

	runSequence(
		'build-all',
		cb);
});