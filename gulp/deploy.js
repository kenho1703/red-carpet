var gulp = require('gulp');
var rsync = require('gulp-rsync');

gulp.task('deploy', function () {
  var rsyncPaths = ['dist/**'];
  var rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: [],
    root: 'dist/',
    hostname: 'api.gosoccerapp.com',
    username: 'gosoccer',
    destination: '/home/gosoccer/manage'
  };

  return gulp.src('./dist/**').pipe(rsync(rsyncConf));
});


