var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(session({
	name:'session-id',
	secret:'12345-67890-09876-54321',
	saveUninitialized:true,
	resave:true,
	store:new fileStore()
}));

function auth(req,res,next) {
	console.log(req.headers);
	if (!req.session.user) {
		var authHeaders = req.headers.authorization;
		if (!authHeaders) {
			var err = new Error("you are not authenticated!");
			err.status = 401;
			next(err);
			return;
		}
		var auth = new Buffer(authHeaders.split(' ')[1], 'base64').toString().split(':');
		var user = auth[0];
		var pass = auth[1];
		if ( user === 'admin' && pass === 'password' ) {
			req.session.user = 'admin';
			next();		// authorized
		} else {
			var err = new Error("you are not authenticated!");
			err.status = 401;
			next(err);
		}
	} else if (req.session.user === 'admin') {
		console.log('req.session: ', req.session);
		next();
	} else {
		var err = new Error("you are not authenticated!");
		err.status = 401;
		next(err);
	}
}

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next) {
	res.writeHead(err.status || 500, {
		'WWW-Authenticate':'Basic',
		'Content-Type':'text/plain'
	});
	res.end(err.message);
});

app.listen(3000, hostname, function() {
	console.log('Server running at http://${hostname}:${port}/');
});