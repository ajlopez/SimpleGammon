var express = require('express')
  , app = express()
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , simplegammon = require('../../');

server.listen(8080);

var Colors = simplegammon.Colors;
var Board = simplegammon.Board;
var Game = simplegammon.Game;

app.use(express.static(path.join(__dirname, 'public')));

var stopped = false;

io.sockets.on('connection', function (socket) {
  socket.on('newplay', function (data) {
    console.dir(data);
    var board = new Board(data.checkers[Colors.Red], data.checkers[Colors.Black]);
    var game = new Game(board); 
  });
  
  socket.on('stop', function() {
    stopped = true;
  });
});