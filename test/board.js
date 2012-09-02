
var simplegammon = require('../'),
    assert = require('assert');

assert.ok(simplegammon.Board);

var board = new simplegammon.Board();

assert.ok(board);

assert.equal(board.getReds(), 0);
assert.equal(board.getBlacks(), 0);



