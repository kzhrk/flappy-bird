# modules
gulp      = require 'gulp'
webserver = require 'gulp-webserver'
webpack   = require 'gulp-webpack'
babel     = require 'gulp-babel'
jade      = require 'gulp-jade'
uglify    = require 'gulp-uglify'
imagemin  = require 'gulp-imagemin'
ghPages   = require 'gulp-gh-pages'

gulp.task 'watch', ->
  gulp.watch './src/**/*.jade', ['jade']
  gulp.watch './src/**/*.js', ['webpack']
  gulp.watch './src/assets/img/**/*', ['image']

gulp.task 'server', ->
  gulp
    .src './public'
    .pipe webserver(
      livereload: true
    )

gulp.task 'webpack', ->
  gulp
    .src './src/js/app.js'
    .pipe webpack(
      entry: './src/js/app.js'
      output:
        filename: 'bundle.js'
      resolve:
        extensions: ['', '.js']
    )
    # .pipe uglify(
    #   preserveComments: 'license'
    # )
    .pipe gulp.dest './public/js'

gulp.task 'jade', ->
  gulp
    .src './src/**/*.jade'
    .pipe jade()
    .pipe gulp.dest('./public')

gulp.task 'copy', ->
  gulp
    .src './src/js/libs/*.js'
    .pipe gulp.dest('./public/js/libs')
  gulp
    .src './src/assets/**/*'
    .pipe gulp.dest('./public/assets')

gulp.task 'image', ->
  gulp
    .src './src/assets/img/**/*'
    .pipe imagemin()
    .pipe gulp.dest('./public/assets/img')

gulp.task 'ghPages', ->
  gulp
    .src './public'
    .pipe ghPages()

gulp.task 'build', ['copy', 'webpack', 'jade', 'image']
gulp.task 'default', ['build', 'server', 'watch']
gulp.task 'deploy', ['ghPages']
