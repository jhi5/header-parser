var express = require('express');
var http = require('http');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index');
});

app.get('/whoami', function(req, res){
	var header = req.headers;
	var regex = /\(([^)]+)\)/;
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress
	var os = regex.exec(header["user-agent"]);
	var obj = {
		"ipaddress": ip,
		"language": header["accept-language"],
		"software": os[1]
	}
	obj = JSON.stringify(obj);
	obj = JSON.parse(obj)
	res.send(obj);
});

app.listen(PORT, function(){
	console.log("Express listening on port " + PORT);
});