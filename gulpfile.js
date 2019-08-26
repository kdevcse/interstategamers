const { watch, series } = require('gulp');
var exec = require('child_process').exec;

function update(cb){
    exec('python3 build/UpdateData.py ${PodId} ${PodKey} ${AirtableKey};', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    cb();

}

exports.update = series(update);