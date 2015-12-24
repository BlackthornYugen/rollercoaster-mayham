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
  var player, deltaY, deltaX, playerVector;
  for (var i = 0; i < this.players.length; i++) {
    player = this.players[i];
    playerVector = Card.getDirection(player.location.z);
    deltaY = player.location.y - y;
    deltaX = player.location.x - x;
    if (player.location.x == x && Math.abs(deltaY) == 1) {
      // Player is above or below tile
      if (deltaY == playerVector.y) {
        // Runs when a card is placed above/below an edge that contains player
        util.log("%s needs to move to %s:%s:%s", player.name, player.location.x, player.location.y + deltaY, player.location.z);
      }
    } else if (player.location.y == y && Math.abs(deltaX) == 1) {
      // Player is left or right of tile
      if (deltaX == playerVector.x) {
        // Runs when a card is placed above/below an edge that contains player
        util.log("%s needs to move to %s:%s:%s", player.name, player.location.x + deltaX, player.location.y, player.location.z);
      }
    }
  }
  this.server.emit('onTurn', cardPaths, x, y);
};

// export the class
module.exports = Match;