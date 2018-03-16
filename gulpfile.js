'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const env = require('./backend-implementation/config/environment');

gulp.task('sass', function() {
	gulp.src('src/index.scss')
		.pipe(sass({ includePaths: ['./Components/styles'] }).on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function() {
	browserSync.init({
		logPrefix: 'Picture Denoising',
		host: env('HOST'),
		port: +env('PORT') + 1,
		open: false,
		notify: false,
		ghost: false,
		ui: false,

		files: [
			'public/css',
			'public/bundle.js'
		]
	});
})

gulp.task('run-css', ['browserSync', 'sass'], function() {
	gulp.watch('src/**/*.scss', ['sass']);
})