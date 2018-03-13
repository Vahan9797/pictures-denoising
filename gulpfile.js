'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	gulp.src('src/index.scss')
		.pipe(sass({ includePaths: ['./Components/styles']}).on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function() {
	browserSync.init({
		proxy: {
			target: 'http://localhost:8080',
			ws: true
		},
		ui: false
	});
})

gulp.task('run-css', ['browserSync', 'sass'], function() {
	gulp.watch('src/**/*.scss', ['sass']);
})
