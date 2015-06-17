const crypto = require('crypto'),
      fs = require('fs');

var options = {
    key: fs.readFileSync(__dirname + '/../example.com.key.pem'),
    cert: fs.readFileSync(__dirname + '/../example.com.cert.pem')
};

var serverOptions = {
    port: 3433,
    dataDir: './data/'
};


var express = require('express');
var app = express();
var server = require('https').createServer(options, app);
var io = require('socket.io').listen(server);
var multiparty = require('multiparty');

app.use('/', express.static(__dirname + '/../justcards-client'));

app.post('/upload', function (req, res, next) {
    /* TODO: update this to db */
    var form = new multiparty.Form();
    var image;
    var title;
    
    form.on('error', next);
    form.on('close', function () {
        res.send('\nuploaded file');
    });
    form.on('part', function (part) {
        if (!part.filename) {
            return;
        }
        if (part.name !== 'image') {
            return part.resume();
        }
        image = {}
        image.filename = part.filename;
        image.size = 0;
        part.on('data', function (buf) {
            image.size += buf.length;
        });
    });
    form.on('file', function (name, file) {
        fs.renameSync(file.path, serverOptions.dataDir + file.originalFilename, function (err) {
            if (err) {
                console.error(err.stack);
            }
        });
    });
    
    form.parse(req);
});

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