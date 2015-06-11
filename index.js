var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        if(msg[0] === '/') {
            console.log('command: ' + msg);
            console.log(socket);
        } else {
            console.log('message: ' + msg);
        }
    });
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(3000, function(){
    console.log('listening on *:3000');
});