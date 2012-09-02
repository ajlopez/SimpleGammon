
var simplegammon = (function() {
    var Colors = { Empty:0, Red: 1, Black: 2 };
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
            
            checkers[Colors.Red][1] = 2;
            checkers[Colors.Black][1] = 2;
            checkers[Colors.Red][12] = 5;
            checkers[Colors.Black][12] = 5;
            checkers[Colors.Red][17] = 3;
            checkers[Colors.Black][17] = 3;
            checkers[Colors.Red][19] = 5;
            checkers[Colors.Black][19] = 5;
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
                distance += checkers[color][k] * (ncells - k);
            }
            return distance;
        }
        
        function countCheckers(checkers) {
            var count = 0;
            
            for (n in checkers)
                count += checkers[n];
                
            return count;
        }
    }
    
    return {
        Board: Board,
        Colors: Colors
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplegammon;
}

