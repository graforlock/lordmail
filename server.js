var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    mailer = require('./utils/mailer'),
    premailer = require('./utils/premailer');

require('shelljs/global');

app.use('/', express.static('./'));

app.use('/*', function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var server = app.listen('8080');
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.on('build_template', function(layout) {
        fs.writeFile('test.html', layout, function(err) {
            if(err) throw err;
                // Make it a higher order function
                exec('premailer test.html > '+ __dirname + '/templates/template.html', function(error, output) {
                    if(!error) {
                        io.emit('created_template', {});
                    } else {
                        console.warn('Errored with code ' + error);
                    }
                })
        });
    })
    socket.on('save_styles',function(styles) {
        fs.writeFileSync('custom.css', styles, 'utf8');
        io.emit('saved_styles');	
    });
    socket.on('send_email', function(address) {
        // Make it a higher order function
        exec('premailer test.html', function(error, output) {
          if(!error) {
              mailer.send(address, output);
              io.emit('email_sent', {});
          } else {
              console.warn('Errored with code ' + error);
          }
        })
    })
});


