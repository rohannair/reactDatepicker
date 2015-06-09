var sass = require('node-sass');
var path = require('path');

console.log(sass.info);

var srcPath   = path.resolve(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'build');

sass.render({
  file: srcPath + '/css/app.scss',
  outFile: buildPath + '/css/',
  outputStyle: 'compressed'
}, function(err, result) {
  if (error) {
      console.log(error.status); // used to be "code" in v2x and below
      console.log(error.column);
      console.log(error.message);
      console.log(error.line);
    }
    else {
      console.log(result.css.toString());

      console.log(result.stats);

      console.log(result.map.toString());
      // or better
      console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
    }
});
