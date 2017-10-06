/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
// TODO : fix dist
var gulp = require('gulp'),
        $ = require('gulp-load-plugins')(),
        prefix = require('gulp-autoprefixer'),
        browserSync = require('browser-sync').create(),
        browserify = require('gulp-browserify'),
        wiredep = require('wiredep').stream,
        runSequence = require('run-sequence'),
        useref = require('gulp-useref'),
        del = require('del'),
        gaze = require('gaze'),
        path = require('path'),
        transform = require('vinyl-transform'),
        source = require('vinyl-source-stream'),
        ngAnnotate = require('gulp-ng-annotate'),
        buffer = require('vinyl-buffer');

// Paths
var paths = {
    src: "app/"
}

// Options
var browserifyOpts = {
    debug: true,
    standalone: 'shared'
};
var browserifyOptsProd = {
    debug: false,
    standalone: 'shared'
};

var wiredepOptions = {
    directory: 'bower_components'
};

var injectOptions = {
    ignorePath: ['.src/', 'dist/', 'docs/'],
    addRootSlash: false
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function () {

    browserSync.init({
        server: './',
        browser: "google chrome"
    });

    gulp.watch(paths.src + 'sass/**/*.scss', ['sass']);
    gulp.watch(paths.src + 'js/**/*.js', ['js:browserify']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Configure CSS tasks.
gulp.task('sass', function () {
    return gulp.src(paths.src + 'sass/**/*.scss')
            .pipe($.sourcemaps.init())
            .pipe($.sass.sync().on('error', $.sass.logError))
            .pipe(prefix('last 2 versions'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(paths.src + 'css'))
            .pipe(browserSync.stream());
});
gulp.task('sass:dist', function () {
    return gulp.src([paths.src + 'sass/**/*.scss',
        '!' + paths.src + 'sass/fontawesome/**/*.scss'
    ])
            .pipe($.sass.sync().on('error', $.sass.logError))
            .pipe(prefix('last 2 versions'))
            .pipe($.cssmin())
            .pipe($.concat('app.css'))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.src + 'css'))
            .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js:dist', function () {
    return gulp.src([paths.src + 'js/app.js'
                , paths.src + 'js/config/*.js'
                , paths.src + 'js/services/*.js'
                , paths.src + 'js/directives/*.js'
                , paths.src + 'js/controllers/*.js'
                , '!' + paths.src + 'js/libraries/**/*.*'
                , '!' + paths.src + 'js/scripts.min.js'
    ])
            .pipe($.concat('scripts.js'))
            .pipe(browserify(browserifyOptsProd))
            .pipe(buffer())
            .pipe(ngAnnotate({ add: true }))
            .pipe($.uglify())
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.src + 'js'));

});

gulp.task("js:browserify", function () {
    return gulp.src(paths.src + 'js/app.js')
            .pipe(browserify(browserifyOpts))
            .pipe(gulp.dest(paths.src + 'js'));
});

// Configure image stuff.
gulp.task('images', function () {
    return gulp.src(paths.src + 'assets/images/**/*.+(png|jpg|gif|svg)')
            .pipe($.imagemin())
            .pipe(gulp.dest(paths.src + 'assets/images'));
});
gulp.task('images:dist', function () {
    return gulp.src(paths.src + 'assets/images/**/*.+(png|jpg|gif|svg)')
            .pipe($.imagemin())
            .pipe(gulp.dest(paths.src + 'assets/images'));
});


gulp.task('font:dist', function () {
    return gulp.src(paths.src + 'assets/fonts/**/*.+(eot|eot?#iefix|woff2|woff|ttf|svg)')
            .pipe(gulp.dest(paths.src + 'assets/fonts'));
});

gulp.task('watch', function () {
    var handleDelete = function (pathToDel) {
        var filePathFromSrc = path.relative(path.resolve(paths.src), pathToDel);
        var destFilePath = path.resolve(paths.src, filePathFromSrc);
        del.sync(destFilePath);
    }

    gulp.watch(paths.src + 'sass/**/*.scss', function (event) {
        if (event.type == 'changed') {
            gulp.start('sass');
        } else if (event.type === 'deleted') {
            handleDelete(event.path);
        } else {
            runSequence('sass', 'inject')
        }
    });
    gulp.watch(paths.src + 'js/**/*.js', function (event) {
        if (event.type == 'changed') {
            gulp.start('js:browserify');
        } else if (event.type === 'deleted') {
            handleDelete(event.path);
        } else {
            runSequence('js:browserify', 'inject')
        }
    });
    gulp.watch(paths.src + '**/*.html', function (event) {
        if (event.type === 'deleted') {
            handleDelete(event.path);
        } else {
            // temp
            gulp.start('move');
            setTimeout(function () {
                gulp.start('inject');
            }, 800);
        }
    });
    gulp.watch(paths.src + 'assets/**/*.*', function (event) {
        if (event.type === 'deleted') {
            handleDelete(event.path);
        } else {
            runSequence('moveAssets')
        }
    });
});

gulp.task('inject', function () {
    var injectStyles = gulp.src([
        // selects all css files from the .src dir
        paths.src + 'css/**/*.css',
        // but ignores css files in the library
        '!' + paths.src + 'css/libraries/**/*.*',
        '!' + paths.src + 'css/app.min.css'
    ], {
        read: false
    });

    var injectScripts = gulp.src([
        // selects all js files from .src dir
        paths.src + 'js/app.js'
                , paths.src + 'js/config/*.js'
                , paths.src + 'js/services/*.js'
                , paths.src + 'js/directives/*.js'
                , paths.src + 'js/controllers/*.js'
                // but ignores test & library files
                , '!' + paths.src + 'js/scripts.min.js',
        '!' + paths.src + 'js/libraries/**/*.js'
    ]);
    return gulp.src('*.php')
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            // write the injections to the .src/index.html file
            .pipe(gulp.dest(''));
});
gulp.task('inject:dist', function () {
    var injectStyles = gulp.src([
        // selects all css files from the .src dir
        paths.src + 'css/**/*.css',
        // but ignores test & library files
        '!' + paths.src + 'css/libraries/**/**/*.*',
        '!' + paths.src + 'css/global.css'
    ], {
        read: false
    });

    var injectScripts = gulp.src([
        // selects all js files from .src dir
        paths.src + 'js/scripts.min.js',
        // but ignores test & library files
        '!' + paths.src + '/**/*.test.js',
        '!' + paths.src + 'js/libraries/**/*.js'
    ]);
    return gulp.src('*.php')
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            // write the injections to the .src/index.html file
            .pipe(gulp.dest(''));
});
//gulp.task('default', ['move', 'sass', 'js:browserify', 'images', 'inject']);
//
gulp.task('default', function (callback) {
    runSequence('sass',
            'inject',
            callback);
});
gulp.task('prod', function (callback) {
    runSequence('default', 'sass:dist',
            'js:dist',
            'inject:dist',
            callback);
});

