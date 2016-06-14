const gulp = require('gulp');
const babel = require('gulp-babel');
const xo = require('gulp-xo');

gulp.task('default', () => {

});

gulp.task('lint', () => {
	gulp.src('lib/**/*.js')
		.pipe(xo());
});

gulp.task('build', () => {
	gulp.src('lib/**/*.js')
		.pipe(babel({
			presets: ['stage-0'],
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(gulp.dest('build'));
});
