
var simplegammon = (function() {
    function Board() {
    }
    
    return {
        Board: Board
    }
}());

if (typeof(window) === 'undefined') {
	module.exports = simplegammon;
}
