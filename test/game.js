
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

assert.equal(game.canPlay(Colors.Black, 23, 1), false);

assert.equal(game.canPlay(Colors.Black, 13, 1), false);
assert.equal(game.canPlay(Colors.Black, 13, 2), true);
assert.equal(game.canPlay(Colors.Black, 13, 3), true);
assert.equal(game.canPlay(Colors.Black, 13, 4), true);
assert.equal(game.canPlay(Colors.Black, 13, 5), true);
assert.equal(game.canPlay(Colors.Black, 13, 6), true);

assert.equal(game.canPlay(Colors.Black, 6, 1), true);
assert.equal(game.canPlay(Colors.Black, 6, 2), true);
assert.equal(game.canPlay(Colors.Black, 6, 3), true);
assert.equal(game.canPlay(Colors.Black, 6, 4), true);
assert.equal(game.canPlay(Colors.Black, 6, 5), false);
assert.equal(game.canPlay(Colors.Black, 6, 6), false);

// Play

game.play(Colors.Black, 24, 1);
board = game.getBoard();
assert.equal(board.getPosition(Colors.Black, 24), 1);
assert.equal(board.getPosition(Colors.Black, 23), 1);

// Can play and play over one enemy checker

assert.equal(game.canPlay(Colors.Red, 6, 4), true);
assert.equal(game.canPlay(Colors.Red, 6, 5), true);

game.play(Colors.Red, 6, 4);
assert.equal(board.getPosition(Colors.Black, 24), 1);
assert.equal(board.getPosition(Colors.Black, 23), 0);
assert.equal(board.getPosition(Colors.Black, 25), 1);
assert.equal(board.getPosition(Colors.Red, 2), 1);

