const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const cssNano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const useref = require("gulp-useref");
const browserSync = require("browser-sync").reload();

// работаем с scss и перебрасываем в build
function scssToCssBuild(){
    return gulp.src('./app/scss/**/*.scss')
            .pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssNano())
            .pipe(sourcemaps.write())
            // .pipe(rename('style.css'))
            .pipe(gulp.dest('./build/css'))
            // .pipe(browserSync.stream())
};

// работаем с scss в папке app
function scssToCssSrc(){
    return gulp.src('./app/scss/**/*.scss')
            .pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./app/css'))
            .pipe(browserSync.stream())
};

// работаем с html и перебрасываем в build
function htmlBuild(){
    return gulp.src("./src/*.html")
            .pipe(gulp.dest("./build/"))
            .pipe(browserSync.stream()) 
};

// очищаем папку build
function clean(){
    return del(['./build/*'])
};

// function запускающая собранный проект в папке разработки в chrome
function openBrowser(){
    return browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false,
        browser: 'chrome'
    })
};


// следим за изменениями в файлах и выполняем функции при изменении
function watch(){
    gulp.watch('./src/*.html', htmlBuild)
    gulp.watch('./src/scss/**/*.scss', scssToCss)
};

// test tasks
gulp.task('scss', scssToCss);
gulp.task('html', htmlBuild);
gulp.task('del', clean);
gulp.task('open_browser', openBrowser);

// отслеживаем изменение файлов и изменяем в build, но без синхронизации с browser.
gulp.task('watch', watch); 

gulp.task('initial', gulp.series('del', 'scss','html', 'open_browser'));

gulp.task('default', gulp.parallel('initial', 'watch'));
