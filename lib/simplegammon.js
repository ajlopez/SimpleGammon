
var simplegammon = (function() {
    var Colors = { Empty:0, Red: 1, Black: 2 };
    var EnemyColor = [];
    EnemyColor[Colors.Red] = Colors.Black;
    EnemyColor[Colors.Black] = Colors.Red;
    var ncells = 26;
    
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
            var dice = dices[0];
            
            for (var k = ncells - 1; k > 0; k--)
                if (game.canPlay(color, k, dice)) {
                    var newgame = new Game(game.getBoard().clone());
                    newgame.play(color, k, dice);
                    games.push(newgame);
                }
                
            return games;
        }
        
        this.evaluate = function(color, level) {
            if (level <= 0)
                return board.getDistance(color) - board.getDistance(EnemyColor[color]);
                
            var total = 0;
            var count = 0;
            
            for (var k = 1; k <= 6; k++) {
                var dices = [k];
                var games = this.getGames(color, dices);

                if (games.length == 0)
                    continue;   // no game for these dices
                
                // get the better evaluation for these dices
                var enemy = EnemyColor[color];                
                var maxeval = -games[0].evaluate(enemy, level - 1);
                for (var j = 1; j < games.length; j++) {
                    var eval = -games[j].evaluate(enemy, level - 1);
                    if (eval > maxeval)
                        maxeval = eval;
                }
                
                count++;
                total += maxeval;
            }
            
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

