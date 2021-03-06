
var simplegammon = (function() {
    var Colors = { Empty:0, Red: 1, Black: 2 };
    var EnemyColor = [];
    EnemyColor[Colors.Red] = Colors.Black;
    EnemyColor[Colors.Black] = Colors.Red;
    var ncells = 26;
    
    var dicecombinations = [];
    
    for (var k = 1; k <= 6; k++)
        for (var j = 1; j <= 6; j++)
            dicecombinations.push([k,j]);
    
    function Board(reds, blacks) {
        var checkers = [];
        
        if (reds)
            checkers[Colors.Red] = reds.slice(0);
        else
            checkers[Colors.Red] = [];
        
        if (blacks)
            checkers[Colors.Black] = blacks.slice(0);
        else
            checkers[Colors.Black] = [];
    
        function initializePosition() {
            for (var k = 0; k < ncells; k++) {
                checkers[Colors.Red][k] = 0;
                checkers[Colors.Black][k] = 0;
            }
        }
        
        this.clone = function() {
            return new Board(checkers[Colors.Red], checkers[Colors.Black]);
        }
        
        this.getCheckers = function () {
            var result = [];
            result[Colors.Red] = checkers[Colors.Red].slice(0);
            result[Colors.Black] = checkers[Colors.Black].slice(0);
            return result;
        };
        
        this.setInitialPosition = function() {
            initializePosition();
            
            checkers[Colors.Red][24] = 2;
            checkers[Colors.Black][24] = 2;
            checkers[Colors.Red][13] = 5;
            checkers[Colors.Black][13] = 5;
            checkers[Colors.Red][8] = 3;
            checkers[Colors.Black][8] = 3;
            checkers[Colors.Red][6] = 5;
            checkers[Colors.Black][6] = 5;
        }
        
        if (!reds && !blacks)
            initializePosition();
        
        this.countReds = function() {
            return countCheckers(checkers[Colors.Red]);
        }
        
        this.countBlacks = function() {
            return countCheckers(checkers[Colors.Black]);
        }
        
        this.putChecker = function(color, position) {
            checkers[color][position] += 1;
        }
        
        this.getPosition = function(color, position) {
            return checkers[color][position];
        }
        
        this.getDistance = function(color) {
            var distance = 0;
            for (var k = 0; k < ncells; k++) {
                distance += checkers[color][k] * (k + 1);
            }
            return distance;
        }
        
        this.moveChecker = function(color, position, newposition) {
            checkers[color][position] -= 1;
            checkers[color][newposition] += 1;
        }
        
        function countCheckers(checkers) {
            var count = 0;
            
            for (n in checkers)
                count += checkers[n];
                
            return count;
        }
    }
    
    function Game(initialboard) {
        var board;
        
        if (initialboard)
            board = initialboard;
        else {
            board = new Board();
            board.setInitialPosition();
        }
        
        this.getBoard = function() {
            return board;
        }
        
        this.canPlay = function(color, position, dice) {
            if (board.getPosition(color, position) == 0)
                return false;
            if (position != ncells - 1 && board.getPosition(color, ncells - 1) > 0)
                return false;
            var newposition = position - dice;
            if (newposition < 0)
                newposition = 0;
            if (newposition == 0) {
                for (var k = ncells; k > 6; k--)
                    if (board.getPosition(color, k) > 0)
                        return false;
            }
            if (board.getPosition(EnemyColor[color], ncells - newposition - 1) > 1)
                return false;
            return true;
        }
        
        this.play = function(color, position, dice) {
            var newposition = position - dice;
            if (newposition < 0)
                newposition = 0;
            if (board.getPosition(EnemyColor[color], ncells - newposition - 1) == 1)
                board.moveChecker(EnemyColor[color], ncells - newposition - 1, ncells - 1);
            board.moveChecker(color, position, newposition);
        }
        
        this.getGames = function(color, dices) {
            var game = this;
            var games = [];
            
            getAllGames(games, this, color, dices, 0, ncells - 1);
            
            return games;
        }
        
        function getAllGames(games, game, color, dices, ndice, position) {
            var dice = dices[ndice];
            
            for (var k = position; k > 0; k--)
                if (game.canPlay(color, k, dice)) {
                    var newgame = new Game(game.getBoard().clone());
                    newgame.play(color, k, dice);
                    if (ndice + 1 == dices.length)
                        games.push(newgame);
                    else
                        getAllGames(games, newgame, color, dices, ndice+1, k);
                }
        }
        
        this.evaluate = function(color, level, alldices) {
            if (!alldices)
                alldices = dicecombinations;
        
            if (level <= 0)
                return board.getDistance(color) - board.getDistance(EnemyColor[color]);
                
            var total = 0;
            var count = 0;
            
            for (var n in alldices) {
                var dices = alldices[n];
                var games = this.getGames(color, dices);

                if (games.length == 0)
                    continue;   // no game for these dices
                
                // get the better evaluation for these dices
                var enemy = EnemyColor[color];                
                var mineval = -games[0].evaluate(enemy, level - 1, alldices);
                for (var j = 1; j < games.length; j++) {
                    var eval = -games[j].evaluate(enemy, level - 1, alldices);
                    if (eval < mineval)
                        mineval = eval;
                }
                
                count++;
                total += mineval;
            }
            
            if (count == 0)
                return board.getDistance(color) - board.getDistance(EnemyColor[color]);
            
            return total/count;
        }
        
        function enemyColor(color) {
            if (color == Colors.Red)
                return Colors.Black;
            if (color == Colors.Black)
                return Colors.Red;
            return Colors.Empty;
        }
    }
    
    return {
        Board: Board,
        Game: Game,
        Colors: Colors
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplegammon;
}

