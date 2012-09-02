
var simplegammon = (function() {
    var Colors = { Empty:0, Red: 1, Black: 2 };
    var ncells = 26;
    
    function Board() {
        var checkers = [];
        checkers[Colors.Red] = [];
        checkers[Colors.Black] = [];
    
        for (var k = 0; k < ncells; k++) {
            checkers[Colors.Red][k] = 0;
            checkers[Colors.Black][k] = 0;
        }
        
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

