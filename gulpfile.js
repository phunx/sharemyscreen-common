const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const xo = require('gulp-xo');
const clean = require('gulp-clean');
const changelog = require('gulp-changelogmd');

gulp.task('default', () => {
});

gulp.task('lint', () => {
	gulp.src(['./*.js', 'test/**/*.js', 'lib/**/*.js'])
		.pipe(xo());
});

// Build

gulp.task('build', () => {
	gulp.src('lib/**/*.js')
		.pipe(babel({
			presets: ['stage-0'],
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
	console.log('Cleaning project ...');
	return gulp.src(['./build'], {read: false})
		.pipe(clean());
});

// Versioning

gulp.task('changelog', () => {
	const pkg = JSON.parse(fs.readFileSync('./package.json'));

	return gulp.src('./CHANGELOG.md')
		.pipe(changelog(pkg.version))
		.pipe(gulp.dest('./'));
});

gulp.task('version', () => {
	const pkg = JSON.parse(fs.readFileSync('./package.json'));

	console.info(pkg.version);
});
