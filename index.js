const crypto = require('crypto'),
      fs = require('fs');

var options = {
    key: fs.readFileSync(__dirname + '/../example.com.key.pem'),
    cert: fs.readFileSync(__dirname + '/../example.com.cert.pem')
};

var serverOptions = {
    port: 3433
};

var app = require('express')();
var server = require('https').createServer(options, app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/jquery.js', function(req, res){
    res.sendFile(__dirname + '/client/jquery.js');
});

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('join', function (name) {
        console.log(name + ' joined');
    });
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(serverOptions.port, function() {
    console.log("listening on *:" + serverOptions.port);
});