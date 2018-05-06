const gulp = require('gulp');

const {
    init: sourceMapInit,
    write: sourceMapWrite
} = require('gulp-sourcemaps');

const srcProject = require('gulp-typescript').createProject('./tsconfig.json');

gulp.task('build-ts-dev', () => {
    return gulp.src('./src/**/*.ts')
        .pipe(sourceMapInit({ loadMaps: true }))
        .pipe(srcProject()).js
        .pipe(sourceMapWrite('./'))
        .pipe(gulp.dest('./build'));
});

gulp.task('build-ts-prod', () => {
    return gulp.src('./src/**/*.ts')
    .pipe(srcProject()).js
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-js', () => {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-static', () => {
    return gulp.src('./src/**/*.json')
        .pipe(gulp.dest('./build'));
});

gulp.task('build-dev', [
    'build-ts-dev',
    'copy-js',
    'copy-static'
]);

gulp.task('build-prod', [
    'build-ts-prod',
    'copy-js',
    'copy-static'
]);