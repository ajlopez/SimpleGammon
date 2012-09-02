
var simplegammon = require('../'),
    assert = require('assert');

var Colors = simplegammon.Colors;

// Board with one red checker

var board = new simplegammon.Board();
board.putChecker(Colors.Red, 24);
var game = new simplegammon.Game(board);

var games = game.getGames(Colors.Red, [1]);

assert.ok(games);
assert.equal(Array.isArray(games), true);
assert.equal(games.length, 1);

assert.equal(games[0].getBoard().getPosition(Colors.Red, 23), 1);

// Board with initial position

game = new simplegammon.Game();

games = game.getGames(Colors.Red, [1]);
assert.ok(games);
assert.equal(Array.isArray(games), true);
assert.equal(games.length, 3);

games = game.getGames(Colors.Red, [2]);
assert.ok(games);
assert.equal(Array.isArray(games), true);
assert.equal(games.length, 4);
