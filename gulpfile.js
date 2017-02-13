'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var uglifyFiles = false;


<!-- ### -->
<!-- All -->
<!-- ### -->
gulp.task('jekyll', function(done) {
	return exec('jekyll build', function() {
		done();
	});
});

gulp.task('copy-sass', function() {
	gulp.src('./sass/**/*')
	.pipe(gulp.dest('./_site/sass'));
});

gulp.task('compile-sass', function() {
	var sassConfig = {};
	if(uglifyFiles === true) {
		sassConfig.outputStyle = 'compressed';
	}

	gulp.src('./sass/*.scss')
	.pipe(sass(sassConfig).on('error', sass.logError))
	.pipe(gulp.dest('./_site/css'));

	gulp.src('./sass/themes/**/*.scss')
	.pipe(sass(sassConfig).on('error', sass.logError))
	.pipe(gulp.dest('./_site/css/themes'));

	gulp.src('./sass/pages/*.scss')
	.pipe(sass(sassConfig).on('error', sass.logError))
	.pipe(gulp.dest('./_site/css/pages'));

	gulp.src('./sass/apps/*.scss')
	.pipe(sass(sassConfig).on('error', sass.logError))
	.pipe(gulp.dest('./_site/css/apps'));
});

gulp.task('copy-bower-components', function() {
	gulp.src('./bower_components/**/*')
	.pipe(gulp.dest('./_site/bower_components/'));
});

gulp.task('copy-js', function() {
	if(uglifyFiles === true) {
		gulp.src('./js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./_site/js'));

		gulp.src('./js/pages/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./_site/js/pages'));

		gulp.src('./js/apps/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./_site/js/apps'));
	} else {
		gulp.src('./js/**/*.js')
		.pipe(gulp.dest('./_site/js'));
	}
});

gulp.task('copy-app-crud-upload-server', function() {
	gulp.src('./apps_crud_upload.php')
	.pipe(gulp.dest('./_site/'));
});


<!-- ##################### -->
<!-- Default - Development -->
<!-- ##################### -->
gulp.task('default', ['jekyll'], function() {
	gulp.start('compile-sass');
	gulp.start('copy-bower-components');
	gulp.start('copy-js');
	gulp.start('copy-app-crud-upload-server');
});


<!-- ########## -->
<!-- Production -->
<!-- ########## -->
gulp.task('production', ['jekyll'], function() {
	// Default tasks
	gulp.start('copy-sass');
	gulp.start('compile-sass');
	gulp.start('copy-bower-components');
	gulp.start('copy-js');
	gulp.start('copy-app-crud-upload-server');

	// Bower
	gulp.src('./bower.json')
	.pipe(gulp.dest('./_site'));

	// Gulpfile
	gulp.src('./gulpfile.production.js')
	.pipe(rename('gulpfile.js'))
	.pipe(gulp.dest('./_site'));

	// NPM
	gulp.src('./package.production.json')
	.pipe(rename('package.json'))
	.pipe(gulp.dest('./_site'));
});


<!-- #### -->
<!-- Demo -->
<!-- #### -->

gulp.task('demo-js', function () {

});

gulp.task('demo', ['jekyll'], function() {
	uglifyFiles = true;

	gulp.start('compile-sass');
	gulp.start('copy-bower-components');
	gulp.start('copy-js');
});