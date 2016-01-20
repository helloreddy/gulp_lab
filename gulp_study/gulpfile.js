var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var browserSync = require('browser-sync').create();

gulp.task('server', ['uglify', 'minifycss', 'minifyhtml'], function(){
  return browserSync.init({
    server : {
      baseDir : 'public/dist'
    }
  });
});

//HTML ������ minify
gulp.task('minifyhtml', function () {
    return gulp.src('public/src/*.html')  //src ���� �Ʒ��� ��� html ������
        .pipe(minifyhtml())               //minify �ؼ�
        .pipe(gulp.dest('public/dist'))          //dist ������ ����
        .pipe(browserSync.reload({stream:true})); //browserSync �� �������� �ݿ�
});

//�ڹٽ�ũ��Ʈ ������ minify
gulp.task('uglify', function () {
    return gulp.src('public/*.js')        //src ���� �Ʒ��� ��� js ������
        .pipe(concat('main.js'))          //�����ϰ�
        .pipe(uglify())                   //minify �ؼ�
        .pipe(gulp.dest('pubilc/dist'))       //dist ������ ����
        .pipe(browserSync.reload({stream:true})); //browserSync �� �������� �ݿ�
});

//CSS ������ minify
gulp.task('minifycss', function () {
    return gulp.src('public/src/*.css')       //src ���� �Ʒ��� ��� css ������
        .pipe(concat('main.css'))         //�����ϰ�
        .pipe(minifycss())                //minify �ؼ�
        .pipe(gulp.dest('public/dist'))      //dist ������ ����
        .pipe(browserSync.reload({stream:true})); //browserSync �� �������� �ݿ�
});

//���� ���� ����
gulp.task('watch', function () {
    gulp.watch('public/src/*.js', ['uglify']);
    gulp.watch('public/src/*.css', ['minifycss']);
    gulp.watch('public/src/*.html', ['minifyhtml']);
});

//gulp�� �����ϸ� default �� minifycss task�� ����
gulp.task('default', ['server', 'watch']);
