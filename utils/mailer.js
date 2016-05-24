var nodemailer = require('nodemailer'),
    CONFIG,
    transporter,
    mailOptions;

CONFIG = Object.freeze({
	user: '',
	passwd: '',
	subject: '**Test Mail**'
});


transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: CONFIG.user,
        pass: CONFIG.passwd
    }
});

mailOptions = {
    from: 'Fred Foo ✔ ' + CONFIG.user,
    to: '', 
    subject: 'Hello ✔', 
    text: CONFIG.text, 
    html: CONFIG.body 
};

exports.send = function(receiver,content) {
	mailOptions.to = receiver;
    mailOptions.html = content;
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
};