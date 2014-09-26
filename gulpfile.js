var gulp = require('gulp');
var filter = require('gulp-filter');
var kclean = require('gulp-kclean');
var modulex = require('gulp-modulex');
var path = require('path');
var rename = require('gulp-rename');
var packageInfo = require('./package.json');
var cwd = process.cwd();
var src = path.resolve(cwd, 'lib');
var build = path.resolve(cwd, 'build');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var replace = require('gulp-replace');
var through2 = require('through2');

gulp.task('lint', function () {
    return gulp.src('./lib/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('clean', function () {
    return gulp.src(build, {
        read: false
    }).pipe(clean());
});

gulp.task('build-locale', ['lint'], function () {
    var tag = 'gregorian-calendar';
    gulp.src('./lib/' + tag + '/i18n/*.js')
        .pipe(replace(/@VERSION@/g, packageInfo.version))
        .pipe(through2.obj(function (s, encoding, callback) {
            var name = tag + '/i18n/' + path.basename(s.path, '.js');
            var contents = 'modulex.add("' + name + '",[], function(require, exports, module) {' + s.contents.toString('utf-8') + '});';
            s.contents = new Buffer(contents, 'utf-8');
            this.push(s);
            callback();
        }))
        .pipe(rename(function (path) {
            path.basename += '-debug';
        }))

        .pipe(gulp.dest(path.resolve(build, tag + '/i18n/')))
        .pipe(replace(/@DEBUG@/g, ''))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(/-debug/, '');
        }))
        .pipe(gulp.dest(path.resolve(build, tag + '/i18n/')));
});

gulp.task('build', ['lint', 'build-locale'], function () {
    var tag = 'gregorian-calendar';
    var packages = {};
    packages[tag] = {
        base: path.resolve(src, tag)
    };
    return gulp.src('./lib/' + tag + '.js')
        .pipe(modulex({
            modulex: {
                packages: packages
            },
            excludeModules: [tag + '/i18n/zh-cn']
        }))
        .pipe(kclean({
            files: [
                {
                    src: './lib/' + tag + '-debug.js',
                    outputModule: tag
                }
            ]
        }))
        .pipe(replace(/@VERSION@/g, packageInfo.version))
        .pipe(gulp.dest(path.resolve(build)))
        .pipe(filter(tag + '-debug.js'))
        .pipe(replace(/@DEBUG@/g, ''))
        .pipe(uglify())
        .pipe(rename(tag + '.js'))
        .pipe(gulp.dest(path.resolve(build)));
});

gulp.task('mx', function () {
    var aggregateBower = require('aggregate-bower');
    aggregateBower('bower_components/', 'mx_modules/');
});

gulp.task('auto-d', function () {
    require('auto-deps')(cwd);
});

gulp.task('default', ['build']);