const gulp = require('gulp');
const sass = require('gulp-sass');
//jshint = require( 'gulp-jshint' );
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const stripDebug = require('gulp-strip-debug');

const open = require('gulp-open');
const port = process.env.PORT || 8080;

gulp.task('connect', function () {
    connect.server({
        port: port,
        livereload: true
    });
});

gulp.task('sass2css', function () {
    return gulp
        .src('sass/**/*.scss')
        .pipe(
        sass({
            outputStyle: 'expanded',
            indentType: 'tab',
            indentWidth: 1
        })
            .on('error', sass.logError)
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(cssmin({compatibility: 'ie10', advanced: false}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
        

});

gulp.task('uglify', function(){
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(rename(function(path){
                path.basename += '.min';
                path.extname = '.js';
            }))
            .pipe(gulp.dest('./js/min'))
            .pipe(connect.reload());
})

gulp.task('livereload', function () {
    gulp
        .watch([
            '*.html',
            '*'
        ])
        .on('change', function (e) {
            gulp
                .src(e.path)
                .pipe(connect.reload());
        });

    gulp
        .watch([
            'img/**/*',
            'js/**/*',
            'fonts/**/*',
        ])
        .on('change', function () {
            gulp
                .src([
                    '*.html',
                    '*'
                ])
                .pipe(connect.reload());
        });

    gulp
        .watch('sass/**/*.scss', ['sass2css']);

    gulp
        .watch('js/*.js', ['uglify']);
});

gulp.task('openWindow', () => {
    let options = {
        uri: `http://localhost:${port}`,
        app: 'google chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));
})

gulp.task('default', ['connect', 'sass2css', 'uglify', 'livereload', 'openWindow']);