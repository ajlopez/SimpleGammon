
var simplegammon = require('../'),
    assert = require('assert');

var Colors = simplegammon.Colors;
    
assert.ok(simplegammon.Game);

var game = new simplegammon.Game();

assert.ok(game);

// Get Board in Initial Position

var board = game.getBoard();

for (k = 0; k < 26; k++) {
    if (k == 24) {
        assert.equal(board.getPosition(Colors.Black, k), 2);
        assert.equal(board.getPosition(Colors.Red, k), 2);
    }
    else if (k == 13) {
        assert.equal(board.getPosition(Colors.Black, k), 5);
        assert.equal(board.getPosition(Colors.Red, k), 5);
    }
    else if (k == 8) {
        assert.equal(board.getPosition(Colors.Black, k), 3);
        assert.equal(board.getPosition(Colors.Red, k), 3);
    }
    else if (k == 6) {
        assert.equal(board.getPosition(Colors.Black, k), 5);
        assert.equal(board.getPosition(Colors.Red, k), 5);
    }
    else {
        assert.equal(board.getPosition(Colors.Black, k), 0);
        assert.equal(board.getPosition(Colors.Red, k), 0);
    }
}

// Can play 

assert.equal(game.canPlay(Colors.Black, 24, 1), true);
assert.equal(game.canPlay(Colors.Black, 24, 2), true);
assert.equal(game.canPlay(Colors.Black, 24, 3), true);
assert.equal(game.canPlay(Colors.Black, 24, 4), true);
assert.equal(game.canPlay(Colors.Black, 24, 5), false);

