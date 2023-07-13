const { src, dest, watch, series, parallel} = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('src/scss/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))
    done();
}

function cssbuild(done) {
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html', 'base.html', 'blog.html', 'entrada.html', 'nosotros.html', 'producto.html', 'tienda.html']
        }))
        .pipe( dest('build/css'))

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', )
    done();
}

function imagenesMin(done) {
    src('src/img/**/*')
        .pipe( cache(imagemin({ optimizationLevel: 3})) )
        .pipe( dest('build/img') )
    done();
}

function imagenesWebp(done) {
    src('src/img/**/*')
    .pipe( webp({ quality: 50}) )
    .pipe( dest('build/img') )
    done();
}

function imagenesAvif(done) {
    src('src/img/**/*')
    .pipe( avif({ quality: 50}) )
    .pipe( dest('build/img') )
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenesMin = imagenesMin;
exports.imagenesWebp = imagenesWebp;
exports.imagenesAvif = imagenesAvif;
exports.default = parallel( imagenesMin, imagenesWebp, imagenesAvif, css, dev );
exports.build = series( cssbuild );