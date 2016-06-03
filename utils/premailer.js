require('shelljs/global');

function premailer(callback, destination) {
    const dest = destination || false;
    return exec('premailer test.html', function(error, output) {
        if(!error) {
            callback();
        } else {
            console.warn('Errored with code ' + error);
        }
    })
}

module.exports = premailer;