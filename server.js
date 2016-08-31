const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    lib = require('./lib'),
    RENDER_PATH = require('./constants/index').RENDER_PATH,
    TEMPLATE_PATH = require('./constants/index').TEMPLATE_PATH;

const db = require('./sqlite').db,
      model = require('./sqlite').model;
let templates;

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

    socket.on('change_template', function(name) {
        model.Templates.findOne({where: { name: name }})
            .then(function(r) { 
                io.emit('changed_template', {content: r.content, name: r.name, schema: r.schema} );
            });
    });

    socket.on('build_template', function(layout, filename, schema) {
        fs.writeFile(RENDER_PATH, layout, function(err) {
                // Make it a higher order function
                lib.inlineCss(RENDER_PATH).then(output => {
                    model.Templates.upsert(
                        {
                            name: filename,
                            content: output,
                            schema: JSON.stringify(schema)
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
        lib.inlineCss(RENDER_PATH).then(output => {
            lib.mailer.send(address, output);
            io.emit('email_sent', {});
        }).catch(error =>  console.warn(error));
   });

});

db.sync().then(function() {
    return model.DefaultCss.findOne().then(function(rec) {
        var css = fs.createWriteStream('./css/default.css');
        css.write(rec.css);
    }).then(function() {
        model.Rows.findAll().then(function(rows) {
            io.on('connection', function(socket) {
                console.log('emitting')
                io.emit('row_schemas', rows);
            })
        });
    });
});