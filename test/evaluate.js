
var simplegammon = require('../'),
    assert = require('assert');

var Colors = simplegammon.Colors;

// Evaluate board with one red checker, level 0

// Board with one red checker

var board = new simplegammon.Board();
board.putChecker(Colors.Red, 24);
var game = new simplegammon.Game(board);

// Evaluate level 0

var result = game.evaluate(Colors.Red, 0);

assert.equal(result, 25);

// Evaluate level 1

var result = game.evaluate(Colors.Red, 1);

assert.equal(result, (24+23+22+21+20+19)/6);

