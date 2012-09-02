
var simplegammon = require('../'),
    assert = require('assert');

var Colors = simplegammon.Colors;

// Evaluate board with one red checker, level 0

// Board with one red checker

var board = new simplegammon.Board();
board.putChecker(Colors.Red, 24);
var game = new simplegammon.Game(board);

var allonedice = [[1], [2], [3], [4], [5], [6]];

// Evaluate level 0

var result = game.evaluate(Colors.Red, 0, allonedice);

assert.equal(result, 25);

// Evaluate level 1

var result = game.evaluate(Colors.Red, 1, allonedice);

assert.equal(result, (24+23+22+21+20+19)/6);

// Evaluate level 1 with all dices

var result = game.evaluate(Colors.Red, 1);

// TODO review result
assert.equal(result, 18);

// Evaluate level 2

var result = game.evaluate(Colors.Red, 2, allonedice);

assert.equal(result, (24+23+22+21+20+19)/6);

// Put one black checker

board.putChecker(Colors.Black, 24);

// Evaluate level 1

result = game.evaluate(Colors.Red, 1, allonedice);

assert.equal(result, (24-25+23-25+22-25+21-25+20-25+19-25)/6);

// Evaluate level 2

result = game.evaluate(Colors.Red, 2, allonedice);

assert.equal(result, 0);

// One red, one black, ready to be hitted

board.putChecker(Colors.Black, 2);
board.putChecker(Colors.Red, 2);

result = game.evaluate(Colors.Red, 2, allonedice);
assert.ok(result < 0.1 && result > -0.1);
