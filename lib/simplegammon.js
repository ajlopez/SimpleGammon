
var simplegammon = (function() {
    function Board() {
        this.getReds = function() {
            return 0;
        }
        
        this.getBlacks = function() {
            return 0;
        }
    }
    
    return {
        Board: Board
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplegammon;
}
