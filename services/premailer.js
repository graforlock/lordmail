require('shelljs/global');

function premailer(filename) {
   filename = filename || "";
   return new Promise(function(resolve, reject) {
        return exec('premailer ' + filename, function(error, output) {
            if(error) {
               reject(error); 
            }
            resolve(output);
           
        }); 
  });
}

module.exports = premailer;
