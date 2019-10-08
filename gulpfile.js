var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var exec = require('child_process').exec;

function compileTs(cb){
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('testDist'));
  cb();
}

function update(cb){
  exec('python3 build/UpdateData.py ${PodId} ${PodKey} ${AirtableKey};', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  cb();
}

exports.update = gulp.series(update);
exports.compile = gulp.series(compileTs);