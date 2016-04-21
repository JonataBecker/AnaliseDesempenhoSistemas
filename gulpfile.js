var gulp = require('gulp');
var connect = require('gulp-connect');
var shell = require('gulp-shell');
var os = require('os');

gulp.task('watch', function () {
    gulp.watch('public_html/app/**/*.js', ['recarrega']);
    gulp.watch('public_html/app/**/*.css', ['recarrega']);
    gulp.watch('public_html/app/**/*.html', ['recarrega']);
    gulp.watch('public_html/index.html', ['recarrega']);
});

gulp.task('recarrega', function () {
    gulp.src([
        'public_html/index.html'
    ])
            .pipe(connect.reload());
});


gulp.task('serve', function () {
    connect.server({
        root: 'public_html',
        port: 8000,
        livereload: true
    });
    var comand = 'start';
    if (os.platform() === 'linux') {
        comand = 'x-www-browser';
    }
    gulp.start('watch');
    gulp.src('public_html/index.html')
            .pipe(shell([comand + ' http://localhost:8000']));
});