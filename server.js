const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    mailer = require('./utils/mailer');
const db = require('./sqlite').db,
      model = require('./sqlite').model;

require('shelljs/global');

app.use('/', express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = app.listen('8080'),
      io = require('socket.io')(server);

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

const Sqlite = db.sync().then(function() {
    return model.DefaultCss.findOne().then(function(rec) {
        var css = fs.createWriteStream('./css/default.css');
        css.write(rec.css);
    });
});