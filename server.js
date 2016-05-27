var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var mailer = require('./utils/mailer');

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
        fs.writeFileSync('test.html', layout, 'utf8');
        io.emit('created_template', {});
    })
    socket.on('send_email', function(address) {
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


