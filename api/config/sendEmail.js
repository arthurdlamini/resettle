const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

let transporter = nodemailer.createTransport({
	// //host: 'reseller111.aserv.co.za', // Office 365 server
	// host: 'reseller111.aserv.co.za', // Office 365 server
	// port: 465, // secure SMTP
	// secure: true,
	// // requireTLS: true,
	// auth: {
	// 	// user: '',
	// 	// pass: '',
	// 	user: '',
	// 	pass: '',
	// },
	// tls: {
	//     ciphers: 'SSLv3'
	// }
	host: 'smtp.office365.com', // Office 365 server
	port: 587, // secure SMTP
	secure: false,
	requireTLS: true,
	auth: {
		user: '',
		pass: '',
	},
	tls: {
		ciphers: 'SSLv3',
	},
});

const handlebarOptions = {
	viewEngine: {
		partialsDir: './config/views/partials',
		layoutsDir: './config/views/layouts',
		defaultLayout: 'layout',
	},
	viewPath: './config/views',
};
transporter.use('compile', hbs(handlebarOptions));

module.exports = {
	
	
	//Reset password email token
	resetPasswordEmail(email, subject, message) {
		console.log(message);
		let mailDetails = {
			from: '"Ewade Support"arthurd@eswade.co.sz',//TO Add email address used to send email notifications.
			to: email,
			subject: subject,
			template: 'partials/resetpassword',
			context: {
				data: {
					name: message.name,
					link: message.link,
				},
			}, // send extra values to template
		};

		transporter.sendMail(mailDetails, function (err, data) {
			if (err) {
				console.log(err);
				console.log(mailDetails);
			} else {
				console.log('Email sent successfully');
			}
		});
	},
	
};
