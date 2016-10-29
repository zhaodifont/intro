/*!
 * gulp
 * $ npm install gulp del gulp-sass gulp-cached gulp-uglify gulp-rename gulp-concat gulp-filter gulp-jshint gulp-cssnano gulp-imagemin browser-sync gulp-autoprefixer --save-dev
 */
 
// Load plugins
var gulp = require('gulp'), // 必须先引入gulp插件
    del = require('del'),  // 文件删除
    sass = require('gulp-sass'), // sass 编译
    cached = require('gulp-cached'), // 缓存当前任务中的文件，只让已修改的文件通过管道
    uglify = require('gulp-uglify'), // js 压缩
    rename = require('gulp-rename'), // 重命名
    concat = require('gulp-concat'), // 合并文件
    filter = require('gulp-filter'), // 过滤筛选指定文件
    jshint = require('gulp-jshint'), // js 语法校验
    // rev = require('gulp-rev'), // 插入文件指纹（MD5）
    // revCollector = require('gulp-rev-collector'),
     // fileinclude = require('gulp-file-include'), // 可以 include html 文件
    cssnano = require('gulp-cssnano'), // CSS 压缩
    imagemin = require('gulp-imagemin'), // 图片优化
    browserSync = require('browser-sync'), // 保存自动刷新
    autoprefixer = require('gulp-autoprefixer'); // 添加 CSS 浏览器前缀

//基础变量

var basePath = 'E:/wamp1/www/intro/personal/',
    cssSrc = basePath + 'src/css/*.css',
    distCssSrc = basePath + 'dist/css/',
    sassSrc = basePath + 'src/css/*.scss',
    imgSrc = basePath + 'src/img/*.{png,jpg,gif,ico}',
    distImgSrc = basePath + 'dist/img/',
    jsSrc = basePath + 'src/js/**/*.js',
    distJsSrc = basePath + 'dist/js/';

// sass
gulp.task('sass', function() {
  return gulp.src(sassSrc)  // 传入 sass 目录及子目录下的所有 .scss 文件生成文件流通过管道并设置输出格式
    .pipe(cached('sass'))
    .pipe(sass())
    .pipe(concat('b.css'))
    .pipe(gulp.dest(distCssSrc)) // 输出到 dist/css 目录下，此时每个文件都有压缩（*.min.css）和未压缩(*.css)两个版本
});
// css （拷贝 *.min.css，常规 CSS 则输出压缩与未压缩两个版本）
gulp.task('css',['sass'], function() {
  del(distCssSrc + '**/*.min.css');
  return gulp.src(cssSrc)
    // .pipe(cached('css'))
    .pipe(concat('a.css'))
    .pipe(gulp.dest(distCssSrc));
});
gulp.task('concatcss',['css'],function(){
    return gulp
        .src(distCssSrc + '**/*.css')
        // .pipe(cached('css'))
        .pipe(concat('zd.css'))
        .pipe(rename({suffix: '.min'})) 
        .pipe(cssnano())
        .pipe(gulp.dest(distCssSrc));
});

// image
gulp.task('image', function() {
  gulp.src(imgSrc)
    .pipe(cached('image'))
    .pipe(imagemin())
    .pipe(gulp.dest(distImgSrc));
});
// script （拷贝 *.min.js，常规 js 则输出压缩与未压缩两个版本）
gulp.task('script', function() {
  del(distJsSrc + '**/*.min.js');
  return gulp.src(jsSrc)
    // .pipe(cached('script'))
    // .pipe(jshint('.jshintrc')) // js的校验与合并，根据需要开启
    // .pipe(jshint.reporter('default'))
    .pipe(concat('commons.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(distJsSrc))
});
// styleReload （结合 watch 任务，无刷新CSS注入）
gulp.task('styleReload', ['concatcss'], function() {
  return gulp.src([distCssSrc])
    .pipe(cached('style'))
    .pipe(browserSync.reload({stream: true})); // 使用无刷新 browserSync 注入 CSS
});

// build，关连执行全部编译任务
gulp.task('build', [ 'css', 'script', 'image'], function () {
  gulp.start('watch');
});
 
// default 默认任务，依赖清空任务
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
// clean 清空 dist 目录
gulp.task('clean', function() {
  return del(basePath + 'dist/');
});

// watch 开启本地服务器并监听
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: '' // 在 dist 目录下启动本地服务器环境，自动启动默认浏览器
    }
  });
 
  // 监控 SASS 文件，有变动则执行CSS注入
  gulp.watch(sassSrc, ['styleReload']);
  // 监控 CSS 文件，有变动则执行CSS注入
  gulp.watch(cssSrc, ['styleReload']);
  // 监控 js 文件，有变动则执行 script 任务
  gulp.watch(jsSrc, ['script']);
  // 监控图片文件，有变动则执行 image 任务
  gulp.watch(imgSrc, ['image']);
  // 监控 html 文件，有变动则执行 html 任务
  // gulp.watch('src/**/*.html', ['html']);
  // 监控 dist 目录下除 css 目录以外的变动（如js，图片等），则自动刷新页面
  gulp.watch(['dist/**/*', '!dist/css/**/*']).on('change', browserSync.reload);
 
});
