var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));


function auth(req,res,next) {
	console.log(req.headers);
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
	console.log(user);
	console.log(pass);
	if ( user === 'admin' && pass === 'password' ) {
		next();		// authorized
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