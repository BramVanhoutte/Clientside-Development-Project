/**
 * gulpfile.js
 * To install Gulp, Yarn is required. 
 * When Yarn is installed run 'yarn install' to install all the dependencies
 * Then do 'yarn remove gulp'
 * Finally run 'yarn global add gulp' 
 *
 * @version 1.1
 * @author  Bram Vanhoutte
 * 
 */

const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');
const rename = require('gulp-rename');
const del = require('del');
const sass = require('gulp-ruby-sass');
const cleanCSS = require('gulp-clean-css');
const csslint = require('gulp-csslint');
const scsslint = require('gulp-scss-lint');
const eslint = require('gulp-eslint');
const image = require('gulp-image');

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

/* =========================================== *
    Linting .css, .scss, .js
 * =========================================== */

gulp.task('css-lint', function() {
    return gulp.src('dist/css/*.css')
      .pipe(csslint())
      .pipe(csslint.formatter());
});

gulp.task('scss-lint', function() {
    return gulp.src('src/scss/*.scss')
      .pipe(scsslint());
});

gulp.task('es-lint', () => {
    return gulp.src(['src/js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/* =========================================== *
    Minifying and SASS-compilation
 * =========================================== */

gulp.task('scripts', function (cb) {
    pump([
        gulp.src('src/js/*.js'),
        rename({suffix: '.min'}),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('styles', function () {

    return sass('src/scss/*.scss', { style: 'expanded'})
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
        
});

gulp.task('images', function() {
    del.sync(['dist/images', 'dist/uploads']);

    gulp.src('src/uploads/**/*')
        .pipe(image())
        .pipe(gulp.dest('dist/uploads'));
    
    gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

/* =========================================== *
    Watch for editng .scss and .js
 * =========================================== */

gulp.task('watch', function(){
    gulp.watch('src/scss/*.scss', ['update']); 
    gulp.watch('src/js/*.js', ['update']);
});

gulp.task('update', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

/* =========================================== *
    Clean task to clear old files
 * =========================================== */

gulp.task('clean', function() {
    return del(['dist/css/**', 'dist/js/**']);
});