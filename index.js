const crypto = require('crypto'),
      fs = require('fs');

var options = {
    key: fs.readFileSync(__dirname + '/../example.com.key.pem'),
    cert: fs.readFileSync(__dirname + '/../example.com.cert.pem')
};

var serverOptions = {
    port: 3433
};

var express = require('express');
var app = express();
var server = require('https').createServer(options, app);
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/../justcards-client'));

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('join', function (name) {
        console.log(name + ' joined');
    });
    
    socket.on('send msg', function (data) {
        io.emit('get msg', data);
        console.log(data);
    });
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(serverOptions.port, function() {
    console.log("listening on *:" + serverOptions.port);
});