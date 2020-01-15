const gulp = require('gulp');
const webpack = require('webpack-stream');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const env = process.env.NODE_ENV;
const isDevelopment = !env || env === 'development';

function html(cb) {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist'));
    cb();
}

function css(cb) {
    gulp.src('src/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gulpIf(!isDevelopment, cleanCSS()))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
    cb();
}

function js(cb) {
    gulp.src('src/js/main.js')
        .pipe(webpack({
            mode: isDevelopment ? 'development' : 'production',
            devtool: 'source-map',
            output: {
                filename: 'main.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['@babel/env']
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./dist/js'));
    cb();
}

function img(cb) {
    gulp.src('src/img/**/*.*')
        .pipe(gulpIf(!isDevelopment, imagemin()))
        .pipe(gulp.dest('./dist/img'));
    cb();
}

function watch() {
    gulp.watch('src/**/*.html', html);
    gulp.watch('src/less/**/*.less', css);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('src/img/**/*.*', img);
}

function livereload(cb) {
    browserSync.create();
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        files: [
            'dist/**/*.*'
        ],
        port: 3000
    });
    cb();
}

exports.default = gulp.series(html, css, js, img, gulp.parallel(livereload, watch));
exports.prod = gulp.series(html, css, js, img);
