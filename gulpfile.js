/**
 * Created by ой on 23.09.2015.
 */

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var process = require('process');

process.env.BROWSERIFYSHIM_DIAGNOSTICS=1;
gulp.task('build', function () {
    var bundler = browserify({
        entries: ['public/src/js/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        fullPaths: true// Requirement of watchify,
    });

    var watcher = watchify(bundler);

    return watcher.on('update', function () {
        console.log('updating');
        var date = Date.now();
        watcher.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('public'))
        .on('finish', function () {
                console.log('finish');
                console.log('after ' + (Date.now() - date) +' ms')
            })
    })
    .bundle()
        .on('error', function (err) {
            console.log(err);
        })
    .pipe(source('main.js'))
    .pipe(gulp.dest('public'))

});


gulp.task('css',function(){
   var watcher = gulp.watch('public/src/css/style.css', function () {
        return  gulp.src(['public/src/css/style.css','public/src/css/bootstrap.min.css'])
            .pipe(gulp.dest('public'))
    }).on('change', function () {
       console.log('startCss')
   }).on('finish', function () {
       console.log('finishCss')
   });
  return  gulp.src(['public/src/css/style.css','public/src/css/bootstrap.min.css'])
      .pipe(gulp.dest('public'))
})

gulp.task('res', function () {
    return gulp.src('public/src/resources/**/*')
    .pipe(gulp.dest('public/resources'))
})
gulp.task('default', ['build','css','res']);