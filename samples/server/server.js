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

function play(game, dices, color) {
    var enemy;
    
    if (color == Colors.Red)
        enemy = Colors.Black;
    else
        enemy = Colors.Red;
            
    var games = game.getGames(color, dices);
    
    var bettervalue = null;
    var better = null;
    
    games.forEach(function (gm) {
        var value = gm.evaluate(enemy, 2);
        
        if (better == null || value > bettervalue) {
            better = gm;
            bettervalue = value;
        }
    });

    return better;
}


io.sockets.on('connection', function (socket) {
  socket.on('newplay', function (data) {
    console.dir(data);
    var board = new Board(data.checkers[Colors.Red], data.checkers[Colors.Black]);
    var game = new Game(board); 
    var dices = data.dices;
    var color = data.color;
    
    var best = play(game, dices, color);
    console.log('best');
    var newcheckers = best.getBoard().getCheckers();
    console.dir(newcheckers);
    socket.emit('newgame', newcheckers);
  });
  
  socket.on('stop', function() {
    stopped = true;
  });
});