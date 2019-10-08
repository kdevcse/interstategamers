var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var exec = require('child_process').exec;

function cleanDist(cb){
  exec('rm -v -R dist/*', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
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

function copySrcToDist(cb){
  exec('cp -v -f -R src/* dist', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  cb();
}

function runWinCompile(cb){
  exec('Powershell.exe -executionpolicy remotesigned -File winCompile.ps1', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  cb();
}

function compileTs(cb){
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
  cb();
}

exports.clean = gulp.series(cleanDist);
exports.update = gulp.series(update);
exports.compile = gulp.series(copySrcToDist,compileTs);
exports.winCompile = gulp.series(runWinCompile,compileTs);