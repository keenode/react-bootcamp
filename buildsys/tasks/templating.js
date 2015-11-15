/**
 * tasks/templating.js
 * ------------------------------------
 * TASK: Templating
 * 'gulp templating'
*/

import swig from 'gulp-swig';
import minifyHTML from 'gulp-minify-html';
import browserSync from 'browser-sync';
import filter from 'gulp-filter';
import replace from 'gulp-replace';
import gutil from 'gulp-util';
import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import runSequence from 'run-sequence';

/**
    $ gulp templating
    > Process .html files with Swig templating system.
    > Set up JavaScript bundles and minify .html files.
*/
gulp.task('templating', function (cb) {
    logger.log('RUNNING TASK : templating', 'runTask');
    runSequence(
        'templating:process',
        [
            'templating:vendor-scripts',
            'templating:minify-html'
        ],
    cb);
});


/* $ gulp templating:process */

gulp.task('templating:process', function () {

    // Get build environment settings
    var canMinifyHTML = config.env[env].html.minify,
        canBundle     = config.env[env].js.bundle;

    var assets = useref.assets({
        searchPath: buildOnlyMode ? './.tmp' : './dist'
    });

    return gulp.src(`${config.appDir.root}/**/*.html`)
        .pipe(swig({
            setup: function (swig) {
                swig.setDefaults({
                    autoescape: false,
                    cache: false,
                    loader: swig.loaders.fs(`${config.appDir.views}/`)
                });
            }
        }))
        .pipe(canBundle ? assets : gutil.noop())
        .pipe(canBundle ? assets.restore() : gutil.noop())
        .pipe(canBundle ? useref() : gutil.noop())
        .pipe(filter(['*.html', '**/*.js']))
        .pipe(gulp.dest(config.buildDir.root));
});


/* $ gulp templating:vendor-scripts */

gulp.task('templating:vendor-scripts', function () {

    var canUglify = config.env[env].js.uglify;

    return gulp.src(`${config.buildDir.js}/vendor.js`)
        .pipe(canUglify ? uglify() : gutil.noop())
        .pipe(gulp.dest(config.buildDir.js));
});


/* $ gulp templating:minify-html */

gulp.task('templating:minify-html', function () {

    var canMinifyHTML = config.env[env].html.minify;

    return gulp.src(`${config.buildDir.root}/index.html`)
        .pipe(canMinifyHTML ? minifyHTML() : gutil.noop())
        .pipe(gulp.dest(config.buildDir.root));
});
