var Card = require("./Card.js");
var util = require("util");

// Constructor
function Player(socket) {
  this.socket = socket;
  this.name = "";
  this.cards = [new Card(), new Card(), new Card()]; // Start with 3 cards
  this.match = null;
  
  socket.on('draw', function() {
      this.cards.push(new Card());
  });
  
  socket.on('play', (cardIndex, x, y) => {
    var card = this.match.board[x][y] = this.cards.splice(cardIndex, 1);
    this.match.playCard(this, card, x, y);
    util.log("%s played card at %s:%s", this.name, x, y);
  });
  
  socket.on('getHand', function(ack) {
    ack(this.cards);
  });
}

Player.prototype.getName = function() {
  return this.name;
}

Player.prototype.getID = function() {
  return this.socket.id;
}

// export the class
module.exports = Player;