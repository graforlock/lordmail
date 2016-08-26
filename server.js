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
let templates;

require('shelljs/global');

app.use('/', express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = app.listen('8080'),
      io = require('socket.io')(server);

io.on('connection', function(socket) {
    
    if(!templates) {
        // standalone function you can repeat
        model.Templates.findAll().then(function(r) {
            templates = templates ? templates : [];
            for(let i = 0; i < r.length; i++) {
                templates[i] = { [r[i].name] : r[i].content };
            }
            io.emit('template_list', templates);
        });
    } 
    socket.on('build_template', function(layout, filename) {
        fs.writeFile(RENDER_PATH, layout, function(err) {
                // Make it a higher order function
                premailer(RENDER_PATH).then(output => {
                    model.Templates.upsert(
                        {
                            name: filename,
                            content: output
                        }
                    ).then(function() {
                        io.emit('created_template', {});
                    });
                })
                .catch(error => console.warn(error));
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