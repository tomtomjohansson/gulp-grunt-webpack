const gulp = require('gulp');
const maps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassdoc = require('sassdoc');
const esdoc = require('gulp-esdoc');
const bs = require('browser-sync');
const del = require('del');
const env = require('gulp-env');

gulp.task('envDev', () => {
  env.set({
    NODE_ENV: 'development'
  });
});

gulp.task('sassDev',()=>{
   return gulp.src('dev/scss/style.scss')
   .pipe(maps.init())
   .pipe(sass({outputStyle:'nested'}))
   .pipe(rename('gulpSass.css'))
   .pipe(maps.write('./'))
   .pipe(gulp.dest('src/style'))
   .pipe(bs.reload({stream: true}));
});

gulp.task('browserify',()=>{
   return browserify({entries:'dev/js/index.js',debug:true})
   .transform(babelify,{presets: ["es2015", "react",'stage-0'],plugins:['transform-decorators-legacy']})
   .bundle()
   .pipe(source('gulpBundle.js'))
   .pipe(buffer())
   .pipe(maps.init({loadMaps: true}))
   .pipe(maps.write('./'))
   .pipe(gulp.dest('src/js'))
   .pipe(bs.reload({stream: true}));
});

gulp.task('browser-sync',()=> {
   bs.init({
      server: {
            baseDir: "./src"
        }
      // proxy: "localhost:3000"
   });
});

gulp.task('watch',['sassDev','browserify','browser-sync',"envDev"],()=>{
   gulp.watch('dev/scss/*.scss',['sassDev']);
   gulp.watch('dev/js/*/**.js',['browserify']);
   gulp.watch('src/*.html').on('change', bs.reload);
});

gulp.task('sassdoc', ()=> {
  return gulp.src('./dev/scss/*.scss')
    .pipe(sassdoc({dest:'src/docs'}));
});

gulp.task('esdoc',()=>{
   return gulp.src("./dev/js")
   .pipe(esdoc({ destination: "src/jsdocs" }));
});


gulp.task('uglify',()=>{
   return gulp.src('src/js/gulpbundle.js')
   .pipe(uglify())
   .pipe(rename('gulpbundle.min.js'))
   .pipe(gulp.dest('dist/js'));
});

gulp.task('sassProd',()=>{
   return gulp.src('dev/scss/style.scss')
   .pipe(sass({outputStyle:'compressed'}))
   .pipe(rename('gulpSass.min.css'))
   .pipe(gulp.dest('dist/css'));
});

gulp.task('envProd', () => {
  env.set({
    NODE_ENV: 'production'
  });
});

gulp.task('dist',["envProd","browserify"],()=>{
   return gulp.src(['src/index.html'],{base:'./'})
   .pipe(gulp.dest('dist'));
});

gulp.task('build',['dist','sassProd'],()=>{
   gulp.start('uglify');
});

gulp.task('clean',()=>{
   del(['dist','src/js/gulpbundle.js','src/style/gulpSass.css']);
});
