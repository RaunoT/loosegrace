'use strict';

var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	maps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	htmlreplace = require('gulp-html-replace'),
	autoprefixer = require('gulp-autoprefixer'),
	browsersync = require('browser-sync').create();

// Vendor tasks
function cleanVendor() {
	return del(['./css/vendor**', './js/vendor**']);
}

function fillVendor() {
	// Bootstrap
	gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css*')
		.pipe(gulp.dest('./css/vendor/bootstrap'))
	gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js*')
		.pipe(gulp.dest('./js/vendor/bootstrap'))
	// Popper.js
	gulp.src('./node_modules/popper.js/dist/umd/popper.min.js*')
		.pipe(gulp.dest('./js/vendor/popper.js'))
	// jQuery
	gulp.src('./node_modules/jquery/dist/jquery.min*')
		.pipe(gulp.dest('./js/vendor/jquery'))
	// Rellax
	gulp.src('./node_modules/rellax/rellax.min.js')
		.pipe(gulp.dest('./js/vendor/rellax'))
	// Hover
	return gulp.src('./node_modules/hover.css/css/hover-min.css')
	.pipe(gulp.dest('./css/vendor/hover'))
}

gulp.task('vendor', gulp.series(cleanVendor, fillVendor));

// JS tasks
function concatJs() {
	return gulp.src([
			'./js/vendor/jquery/jquery.min.js',
			'./js/vendor/popper.js/popper.min.js',
			'./js/vendor/bootstrap/bootstrap.min.js',
			'./js/vendor/rellax/rellax.min.js',
			'./js/functions.js'
		])
		.pipe(maps.init())
		.pipe(concat('main.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./js'))
		.pipe(browsersync.stream());
}

// CSS tasks
function compileSass() {
	return gulp.src('./css/scss/main.scss')
		.pipe(maps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('./css'))
		.pipe(browsersync.stream());
}

function concatCss() {
	return gulp.src([
			'./css/vendor/bootstrap/bootstrap.min.css',
			'./css/vendor/hover/hover-min.css',
			'./css/main.css',
		])
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./css'));
}

// Dist tasks
function cleanDist() {
	return del('./dist**');
}

function build() {
	return gulp.src([
			'./img/**/*'
		], {
			base: './'
		})
		.pipe(gulp.dest('./dist'));
}

function renameSources() {
	return gulp.src('./*.html')
		.pipe(htmlreplace({
			'js': 'js/main.min.js',
			'css': 'css/main.min.css'
		}))
		.pipe(gulp.dest('./dist'));
}

function minifyCss() {
	return gulp.src('./css/main.css')
		.pipe(cleancss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./dist/css'));
}

function minifyJs() {
	return gulp.src('./js/main.js')
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('./dist/js'));
}

gulp.task('dist', gulp.series('vendor', cleanDist, build, renameSources, compileSass, concatCss, minifyCss, concatJs, minifyJs));

// Default task
gulp.task('default', gulp.series('vendor', compileSass, concatCss, concatJs));

// Dev tasks
function watch() {
	browsersync.init({
		server: './'
	});
	gulp.watch('./css/scss/**/*.scss', gulp.series(compileSass, concatCss));
	gulp.watch(["./js/**/*.js", "!./js/main.js", '!./js/*.map'], concatJs);
	gulp.watch('./**/*.html').on('change', browsersync.reload);
}

gulp.task('dev', gulp.series('default', watch));