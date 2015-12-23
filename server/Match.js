// Constructor
function Match(server) {
  var BOARD_HEIGHT = 5;
  var BOARD_WIDTH = 5;
  
  this.players = [];
  this.board = [];
  this.server = server;
  
  for (var x = 0; x < BOARD_HEIGHT; x++) {
    this.board.push(new Array(BOARD_WIDTH)); // Add row
  }
}

Match.prototype.addPlayer = function(player) {
  this.players.push(player);
}

Match.prototype.playCard = function(player, card, x, y) {
  this.board[x][y] = card;
  this.server.emit('onTurn', 'player', x, y);
}
// export the class
module.exports = Match;