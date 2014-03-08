
var simplegammon = require('../');

var Colors = simplegammon.Colors;

exports['Game exists'] = function (test) {    
    test.ok(simplegammon.Game);
};

exports['Create game'] = function (test) {
    var game = new simplegammon.Game();

    test.ok(game);
}

exports['Get Board in Initial Position'] = function (test) {
    var game = new simplegammon.Game();
    var board = game.getBoard();

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

exports['Can play'] = function (test) {
    var game = new simplegammon.Game();
    var board = game.getBoard();

    test.equal(game.canPlay(Colors.Black, 24, 1), true);
    test.equal(game.canPlay(Colors.Black, 24, 2), true);
    test.equal(game.canPlay(Colors.Black, 24, 3), true);
    test.equal(game.canPlay(Colors.Black, 24, 4), true);
    test.equal(game.canPlay(Colors.Black, 24, 5), false);

    test.equal(game.canPlay(Colors.Black, 23, 1), false);

    test.equal(game.canPlay(Colors.Black, 13, 1), false);
    test.equal(game.canPlay(Colors.Black, 13, 2), true);
    test.equal(game.canPlay(Colors.Black, 13, 3), true);
    test.equal(game.canPlay(Colors.Black, 13, 4), true);
    test.equal(game.canPlay(Colors.Black, 13, 5), true);
    test.equal(game.canPlay(Colors.Black, 13, 6), true);

    test.equal(game.canPlay(Colors.Black, 6, 1), true);
    test.equal(game.canPlay(Colors.Black, 6, 2), true);
    test.equal(game.canPlay(Colors.Black, 6, 3), true);
    test.equal(game.canPlay(Colors.Black, 6, 4), true);
    test.equal(game.canPlay(Colors.Black, 6, 5), false);
    test.equal(game.canPlay(Colors.Black, 6, 6), false);
};

exports['Play'] = function (test) {
    var game = new simplegammon.Game();

    game.play(Colors.Black, 24, 1);

    var board = game.getBoard();

    test.equal(board.getPosition(Colors.Black, 24), 1);
    test.equal(board.getPosition(Colors.Black, 23), 1);
}

exports['Can play and play over one enemy checker'] = function (test) {
    var game = new simplegammon.Game();

    game.play(Colors.Black, 24, 1);
    
    var board = game.getBoard();
    
    test.equal(board.getPosition(Colors.Black, 24), 1);
    test.equal(board.getPosition(Colors.Black, 23), 1);

    test.equal(game.canPlay(Colors.Red, 6, 4), true);
    test.equal(game.canPlay(Colors.Red, 6, 5), true);

    game.play(Colors.Red, 6, 4);
    
    board = game.getBoard();
   
    test.equal(board.getPosition(Colors.Black, 24), 1);
    test.equal(board.getPosition(Colors.Black, 23), 0);
    test.equal(board.getPosition(Colors.Black, 25), 1); // removed checker
    test.equal(board.getPosition(Colors.Red, 2), 1);
}

exports['Can play out of the board'] = function (test) {
    var newboard = new simplegammon.Board();
    newboard.putChecker(Colors.Red, 1);
    var newgame = new simplegammon.Game(newboard);
    newgame.canPlay(Colors.Red, 1, 1);
    newgame.canPlay(Colors.Red, 1, 2);
    newgame.canPlay(Colors.Red, 1, 3);
    newgame.canPlay(Colors.Red, 1, 4);
    newgame.canPlay(Colors.Red, 1, 5);
    newgame.canPlay(Colors.Red, 1, 6);

    newgame.play(Colors.Red, 1, 5);
    test.equal(newboard.getPosition(Colors.Red, 0), 1);
}

