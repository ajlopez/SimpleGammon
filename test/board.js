
var simplegammon = require('../'),
    assert = require('assert');

var Colors = simplegammon.Colors;
    
assert.ok(simplegammon.Board);

var board = new simplegammon.Board();

assert.ok(board);

assert.equal(board.countReds(), 0);
assert.equal(board.countBlacks(), 0);

for (var k=0; k <= 25; k++) {
    assert.equal(board.getPosition(Colors.Red, k), 0);
    assert.equal(board.getPosition(Colors.Black, k), 0);
}

board.putChecker(Colors.Red, 1);

assert.equal(board.countReds(), 1);
assert.equal(board.getPosition(Colors.Red, 1), 1);
assert.equal(board.countBlacks(), 0);

