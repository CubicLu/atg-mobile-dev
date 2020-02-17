module.exports = function(ctx) {
  var fs = require('fs-extra');

  fs.emptyDir('./www', err => {
    fs.copy('./build','./www');
  })
};