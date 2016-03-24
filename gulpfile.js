'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    scp = require('gulp-scp2'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src('*.less')
    .pipe(less())
    .pipe(gulp.dest('public'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('*.less', ['less']);
});

// gulp.task('upload', function() {
//     watch('*', function () {
//         gulp.src('css/**/*.css')
//             .pipe(watch('css/**/*.css'))
//             .on('end', cb);
//     });
// });

// gulp.task('upload', funciton() {
//     gulp.watch('*', ['upload']);
// })
// 

gulp.task('upload', function() {
    return gulp.src('*')
            .pipe(scp({
                host: 'test.ydl.com',
                username: 'root',
                password: '123123',
                dest: '/tmp/js/',
                watch: function(client) {
                    client.on('write', function(o) {
                        gutil.log(gutil.colors.green('write', o.destination));
                    });
                }
            }))
            .on('error', function(err) {
                console.log(err);
            });
});


gulp.task('watch', function() {
    return gulp.watch('*', function(event) {
        gulp.src(event.path)
            .pipe(scp({
                host: 'test.ydl.com',
                username: 'root',
                password: '123123',
                dest: '/tmp/js/',
                watch: function(client) {
                    client.on('write', function(o) {
                        gutil.log(gutil.colors.green('write', o.destination));
                    });
                }
            }))
            .on('error', function(err) {
                console.log(err);
            });
    });
});



