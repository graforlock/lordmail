const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    mailer = require('./utils/mailer'),
    premailer = require('./utils/premailer'),
    RENDER_PATH = require('./constants/index').RENDER_PATH,
    TEMPLATE_PATH = require('./constants/index').TEMPLATE_PATH;

const db = require('./sqlite').db,
      model = require('./sqlite').model;

require('shelljs/global');

app.use('/', express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = app.listen('8080'),
      io = require('socket.io')(server);

io.on('connection', function(socket) {

    // List to render settings from the saved templates   
    fs.readdir(__dirname + '/templates/', function(err,files) {
        const junklessFiles = files.filter(file => file !== '.DS_Store');
        io.emit('template_list', junklessFiles);
    });
    
    socket.on('build_template', function(layout,filename) {
        fs.writeFile('test.html', layout, function(err) {
                // Make it a higher order function
                premailer(RENDER_PATH).then(output => {
                    fs.writeFile(TEMPLATE_PATH + filename + '.html', output, () => {
                        io.emit('created_template', {});
                    });
                }).catch(error => console.warn(error));
         });
    });

    socket.on('save_styles',function(styles) {
        fs.writeFileSync('custom.css', styles, 'utf8');
        io.emit('saved_styles');	
    });

    socket.on('send_email', function(address) {
        // Sends just the output (no writes)
        premailer(RENDER_PATH).then(output => {
            mailer.send(address, output);
            io.emit('email_sent', {});
        }).catch(error =>  console.warn(error));
   });

});

const Sqlite = db.sync().then(function() {
    return model.DefaultCss.findOne().then(function(rec) {
        var css = fs.createWriteStream('./css/default.css');
        css.write(rec.css);
    });
});