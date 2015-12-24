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

/**
 * Add a player to the game
 * @param player
 */
Match.prototype.addPlayer = function(player) {
  this.players.push(player);
};

/**
 * Play a card
 * @param player The player playing the card
 * @param cardPaths The path array from a card
 * @param x The number of spaces right of origin (bottom left)
 * @param y The number of spaces above origin (bottom left)
 */
Match.prototype.playCard = function(player, cardPaths, x, y) {
  this.board[x][y] = cardPaths;
  this.server.emit('onTurn', cardPaths, x, y);
};

// export the class
module.exports = Match;