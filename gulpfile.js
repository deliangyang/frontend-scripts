'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    scp = require('gulp-scp2'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    replace = require('gulp-replace'),
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

/**
 *  上传文件到服务器
 */
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


/**
 *  文档检测，上传文件至服务器
 */
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

/**
 *  文档替换
 */
gulp.task('replace', function() {
    return gulp.src(['add.js'])
            .pipe(replace('module\.exports', 'module.exports'))
            .pipe(gulp.dest('build/'));
});



