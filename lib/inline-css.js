var juice = require('juice');

function inlineCss(filename){
  return new Promise(function (fulfill, reject){
        juice.juiceFile(filename, {}, function(err, res) {
            if(err) reject(err);
            else fulfill(res);
        });
  });
}

module.exports = inlineCss;
