/*var http = require('http');
var express = require('express');
var app = express();

app.use(function(req, res){
	res.writeHead(200, {"Content-Type":"text/html"});
	res.end('<h1>Hello express</h1>');
});

http.createServer(app).listen(1337, function(){
	console.log('Server running ap http://127.0.0.1:1337/');
});*/


var express = require('express');

var app = express();

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.listen(3000, function(){
	console.log('Server On!');
});
