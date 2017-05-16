var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res) {
    if (req.method == 'GET') {
        var fileurl;
        if (req.url == '/') {
            fileurl = '/index.html';
        } else {
            fileurl = req.url;
        }
        var filePath = path.resolve('./public'+fileurl);
        var fileExt = path.extname(filePath);
        if (fileExt == '.html' || fileExt == '.htm') {
            fs.exists(filePath, function(exists) {
                if (!exists) {
                    res.writeHead(404, {'ContentType':'text/html'});
                    res.end('<h1>Error 404: ' + fileurl + ' not found </h1>');
                } else {
                    res.writeHead(200, {'ContentType':'text/html'});
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<html><body><h1>Error 404: ' + fileurl + ' not a HTML file</h1></body></html>');
        }
    }
});

server.listen(port, hostname, function() {
    console.log('Server running at http://${hostname}:{port}');
});
