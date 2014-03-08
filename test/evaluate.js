
var simplegammon = require('../');

var Colors = simplegammon.Colors;
var allonedice = [[1], [2], [3], [4], [5], [6]];

// Evaluate board with one red checker, level 0

exports['Board with one red checker, evaluate level 0'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    var game = new simplegammon.Game(board);

    var result = game.evaluate(Colors.Red, 0, allonedice);

    test.equal(result, 25);
}

exports['Evaluate level 1'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    var game = new simplegammon.Game(board);

    var result = game.evaluate(Colors.Red, 1, allonedice);

    test.equal(result, (24+23+22+21+20+19)/6);
}

exports['Evaluate level 1 with all dices'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    var game = new simplegammon.Game(board);

    var result = game.evaluate(Colors.Red, 1);

    // TODO review result
    test.equal(result, 18);
}

exports['Evaluate level 2'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    var game = new simplegammon.Game(board);

    var result = game.evaluate(Colors.Red, 2, allonedice);

    test.equal(result, (24+23+22+21+20+19)/6);
}

exports['Evaluate level 1 with one black checker'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    board.putChecker(Colors.Black, 24);

    var game = new simplegammon.Game(board);

    result = game.evaluate(Colors.Red, 1, allonedice);

    test.equal(result, (24-25+23-25+22-25+21-25+20-25+19-25)/6);
}

exports['Evaluate level 2 with one black checker'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    board.putChecker(Colors.Black, 24);

    var game = new simplegammon.Game(board);

    result = game.evaluate(Colors.Red, 2, allonedice);

    test.equal(result, 0);
}

exports['One red, one black, ready to be hitted'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    board.putChecker(Colors.Black, 24);
    board.putChecker(Colors.Black, 2);
    board.putChecker(Colors.Red, 2);

    var game = new simplegammon.Game(board);

    result = game.evaluate(Colors.Red, 2, allonedice);
    test.ok(result < 0.1 && result > -0.1);
}

