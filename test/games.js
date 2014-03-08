
var simplegammon = require('../');

var Colors = simplegammon.Colors;

exports['Board with one red checker'] = function (test) {
    var board = new simplegammon.Board();
    board.putChecker(Colors.Red, 24);
    var game = new simplegammon.Game(board);

    var games = game.getGames(Colors.Red, [1]);

    test.ok(games);
    test.equal(Array.isArray(games), true);
    test.equal(games.length, 1);

    test.equal(games[0].getBoard().getPosition(Colors.Red, 23), 1);

    games = game.getGames(Colors.Red, [1, 1]);

    test.ok(games);
    test.equal(Array.isArray(games), true);
    test.equal(games.length, 1);

    test.equal(games[0].getBoard().getPosition(Colors.Red, 22), 1);
}

exports['Board with initial position'] = function (test) {
    var game = new simplegammon.Game();

    var games = game.getGames(Colors.Red, [1]);
    test.ok(games);
    test.equal(Array.isArray(games), true);
    test.equal(games.length, 3);

    games = game.getGames(Colors.Red, [2]);
    test.ok(games);
    test.equal(Array.isArray(games), true);
    test.equal(games.length, 4);
}

