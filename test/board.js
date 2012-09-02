
var simplegammon = require('../'),
    assert = require('assert');

var Colors = simplegammon.Colors;
    
assert.ok(simplegammon.Board);

// Empty Board

var board = new simplegammon.Board();

assert.ok(board);

assert.equal(board.countReds(), 0);
assert.equal(board.countBlacks(), 0);

for (var k=0; k <= 25; k++) {
    assert.equal(board.getPosition(Colors.Red, k), 0);
    assert.equal(board.getPosition(Colors.Black, k), 0);
}

assert.equal(board.getDistance(Colors.Red), 0);
assert.equal(board.getDistance(Colors.Black), 0);

// Put red checker

board.putChecker(Colors.Red, 1);

assert.equal(board.countReds(), 1);
assert.equal(board.getPosition(Colors.Red, 1), 1);
assert.equal(board.countBlacks(), 0);

assert.equal(board.getDistance(Colors.Red), 25);
assert.equal(board.getDistance(Colors.Black), 0);

// Put black checker

board.putChecker(Colors.Black, 1);

assert.equal(board.countReds(), 1);
assert.equal(board.getPosition(Colors.Red, 1), 1);
assert.equal(board.countBlacks(), 1);
assert.equal(board.getPosition(Colors.Black, 1), 1);

assert.equal(board.getDistance(Colors.Red), 25);
assert.equal(board.getDistance(Colors.Black), 25);

// Put second red checker

board.putChecker(Colors.Red, 2);

assert.equal(board.countReds(), 2);
assert.equal(board.getPosition(Colors.Red, 1), 1);
assert.equal(board.getPosition(Colors.Red, 2), 1);
assert.equal(board.countBlacks(), 1);

assert.equal(board.getDistance(Colors.Red), 49);
assert.equal(board.getDistance(Colors.Black), 25);

// Set initial position

board.setInitialPosition();

assert.equal(board.countReds(), 15);
assert.equal(board.countBlacks(), 15);

for (k = 0; k < 26; k++) {
    if (k == 1) {
        assert.equal(board.getPosition(Colors.Black, k), 2);
        assert.equal(board.getPosition(Colors.Red, k), 2);
    }
    else if (k == 12) {
        assert.equal(board.getPosition(Colors.Black, k), 5);
        assert.equal(board.getPosition(Colors.Red, k), 5);
    }
    else if (k == 17) {
        assert.equal(board.getPosition(Colors.Black, k), 3);
        assert.equal(board.getPosition(Colors.Red, k), 3);
    }
    else if (k == 19) {
        assert.equal(board.getPosition(Colors.Black, k), 5);
        assert.equal(board.getPosition(Colors.Red, k), 5);
    }
    else {
        assert.equal(board.getPosition(Colors.Black, k), 0);
        assert.equal(board.getPosition(Colors.Red, k), 0);
    }
}

// Clone board with initial position

var cloned = board.clone();

assert.equal(cloned.countReds(), 15);
assert.equal(cloned.countBlacks(), 15);

for (k = 0; k < 26; k++) {
    if (k == 1) {
        assert.equal(cloned.getPosition(Colors.Black, k), 2);
        assert.equal(cloned.getPosition(Colors.Red, k), 2);
    }
    else if (k == 12) {
        assert.equal(cloned.getPosition(Colors.Black, k), 5);
        assert.equal(cloned.getPosition(Colors.Red, k), 5);
    }
    else if (k == 17) {
        assert.equal(cloned.getPosition(Colors.Black, k), 3);
        assert.equal(cloned.getPosition(Colors.Red, k), 3);
    }
    else if (k == 19) {
        assert.equal(cloned.getPosition(Colors.Black, k), 5);
        assert.equal(cloned.getPosition(Colors.Red, k), 5);
    }
    else {
        assert.equal(cloned.getPosition(Colors.Black, k), 0);
        assert.equal(cloned.getPosition(Colors.Red, k), 0);
    }
}

