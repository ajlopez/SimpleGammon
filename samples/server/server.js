var express = require('express')
  , app = express()
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , simplegammon = require('../../');

server.listen(8080);

app.use(express.static(path.join(__dirname, 'public')));

var stopped = false;

io.sockets.on('connection', function (socket) {
  socket.on('newplay', function (data) {
    console.dir(data);
  });
  
  socket.on('stop', function() {
    stopped = true;
  });
});