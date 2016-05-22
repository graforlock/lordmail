var fs = require('fs');

module.exports = function(layout, filename) {
  fs.writeFile(filename, layout, function(err) {
     console.log(err); 
  });
};