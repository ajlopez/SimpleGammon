
var simplegammon = require('../');

var Colors = simplegammon.Colors;

exports['board exists'] = function (test) {    
    test.ok(simplegammon.Board);
};

exports['Empty Board'] = function (test) {
    var board = new simplegammon.Board();

    test.ok(board);

    test.equal(board.countReds(), 0);
    test.equal(board.countBlacks(), 0);

    for (var k=0; k <= 25; k++) {
        test.equal(board.getPosition(Colors.Red, k), 0);
        test.equal(board.getPosition(Colors.Black, k), 0);
    }

    test.equal(board.getDistance(Colors.Red), 0);
    test.equal(board.getDistance(Colors.Black), 0);
};

exports['Put red checker'] = function (test) {
    var board = new simplegammon.Board();

    board.putChecker(Colors.Red, 1);

    test.equal(board.countReds(), 1);
    test.equal(board.getPosition(Colors.Red, 1), 1);
    test.equal(board.countBlacks(), 0);

    test.equal(board.getDistance(Colors.Red), 2);
    test.equal(board.getDistance(Colors.Black), 0);
};

exports['Put black checker'] = function (test) {
    var board = new simplegammon.Board();

    board.putChecker(Colors.Red, 1);
    board.putChecker(Colors.Black, 1);

    test.equal(board.countReds(), 1);
    test.equal(board.getPosition(Colors.Red, 1), 1);
    test.equal(board.countBlacks(), 1);
    test.equal(board.getPosition(Colors.Black, 1), 1);

    test.equal(board.getDistance(Colors.Red), 2);
    test.equal(board.getDistance(Colors.Black), 2);
};

exports['Put second red checker'] = function (test) {
    var board = new simplegammon.Board();

    board.putChecker(Colors.Red, 1);
    board.putChecker(Colors.Black, 1);
    board.putChecker(Colors.Red, 2);

    test.equal(board.countReds(), 2);
    test.equal(board.getPosition(Colors.Red, 1), 1);
    test.equal(board.getPosition(Colors.Red, 2), 1);
    test.equal(board.countBlacks(), 1);

    test.equal(board.getDistance(Colors.Red), 5);
    test.equal(board.getDistance(Colors.Black), 2);
}

exports['Set initial position'] = function (test) {
    var board = new simplegammon.Board();

    board.setInitialPosition();

    test.equal(board.countReds(), 15);
    test.equal(board.countBlacks(), 15);

    for (k = 0; k < 26; k++) {
        if (k == 24) {
            test.equal(board.getPosition(Colors.Black, k), 2);
            test.equal(board.getPosition(Colors.Red, k), 2);
        }
        else if (k == 13) {
            test.equal(board.getPosition(Colors.Black, k), 5);
            test.equal(board.getPosition(Colors.Red, k), 5);
        }
        else if (k == 8) {
            test.equal(board.getPosition(Colors.Black, k), 3);
            test.equal(board.getPosition(Colors.Red, k), 3);
        }
        else if (k == 6) {
            test.equal(board.getPosition(Colors.Black, k), 5);
            test.equal(board.getPosition(Colors.Red, k), 5);
        }
        else {
            test.equal(board.getPosition(Colors.Black, k), 0);
            test.equal(board.getPosition(Colors.Red, k), 0);
        }
    }
};

exports['Clone board with initial position'] = function (test) {
    var board = new simplegammon.Board();

    board.setInitialPosition();
    var cloned = board.clone();

    test.equal(cloned.countReds(), 15);
    test.equal(cloned.countBlacks(), 15);

    for (k = 0; k < 26; k++) {
        if (k == 24) {
            test.equal(cloned.getPosition(Colors.Black, k), 2);
            test.equal(cloned.getPosition(Colors.Red, k), 2);
        }
        else if (k == 13) {
            test.equal(cloned.getPosition(Colors.Black, k), 5);
            test.equal(cloned.getPosition(Colors.Red, k), 5);
        }
        else if (k == 8) {
            test.equal(cloned.getPosition(Colors.Black, k), 3);
            test.equal(cloned.getPosition(Colors.Red, k), 3);
        }
        else if (k == 6) {
            test.equal(cloned.getPosition(Colors.Black, k), 5);
            test.equal(cloned.getPosition(Colors.Red, k), 5);
        }
        else {
            test.equal(cloned.getPosition(Colors.Black, k), 0);
            test.equal(cloned.getPosition(Colors.Red, k), 0);
        }
    }
    board.putChecker(Colors.Red, 2);
    cloned.putChecker(Colors.Black, 2);

    test.equal(cloned.countReds(), 15);
    test.equal(cloned.countBlacks(), 16);
    test.equal(board.countReds(), 16);
    test.equal(board.countBlacks(), 15);
};

