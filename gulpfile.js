var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload')
    htmlminify = require("gulp-html-minify"),
    imagemin = require('gulp-imagemin'),
    uglify = require("gulp-uglify");

gulp.task('styles', function() {
    return sass('src/assets/scss/main.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(livereload())
        .pipe(notify({ message: 'SCSS Compiled & Minified' }));
});

gulp.task('scripts', function() {
    return gulp.src("src/javascript/**")
        .pipe(concat('main.js'))
        .pipe(gulp.dest("dist/javascript"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/javascript'))
        .pipe(livereload())
        .pipe(notify({message:"Minified & Bundled JS."}));
});

gulp.task('templates' , function(){
    return gulp.src("src/templates/**/*.html")
        .pipe(htmlminify())
        .pipe(gulp.dest("dist/templates"))
        .pipe(livereload())
        .pipe(notify({message:"Compressed HTML."}));
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(notify({message:"Compressed HTML."}));
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(['src/**', 'index.html']).on('change', livereload.changed);

    gulp.watch(['src/javascript/*.js', 'src/javascript/**/*.js'], ['scripts']);

    gulp.watch(['src/assets/scss/*.scss'], ['styles']);

    gulp.watch(['src/templates/*.html', 'src/templates/partials/*.html'], ['templates'])
});
