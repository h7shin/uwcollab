var express = require('express');
var connect = require('connect');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// logging
router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

// routes
require('./app/routes.js')(router);

app.use(router);

server.listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});

io.on('connection', function(socket){
  	console.log('a user connected');
  	var clientId = socket.id;
  	socket.emit('connected to server', clientId);
  	socket.on('chat message', function(msg) {
		console.log("got message " + msg.text);
		io.emit('server sent message', msg);
	});
});
