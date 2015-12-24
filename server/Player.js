var Card = require("./Card.js");
var util = require("util");

// Constructor
function Player(socket) {
  this.socket = socket;
  this.name = "";
  this.cards = [new Card(), new Card(), new Card()]; // Start with 3 cards
  this.match = null;
  
  socket.on('draw', ack => {
    var card = new Card();
    this.cards.push(card);
    ack(card.paths);
  });
  
  socket.on('play', (cardIndex, x, y) => {
    if (this.cards.length < cardIndex + 1) {
      this.socket.emit('message', 'Card not found.');
    } else if (this.match.board[x][y]) {
      this.socket.emit('message', 'You may not play a card there');
    } else {
      var card = this.match.board[x][y] = this.cards.splice(cardIndex, 1)[0];
      this.match.playCard(this, card.paths, x, y);
      util.log("%s played card at %s:%s", this.getID(), x, y);
    }
  });

  socket.on('getHand', ack => {
    var cardPathsArray = [];
    this.cards.map(x => cardPathsArray.push(x.paths));
    ack(cardPathsArray);
  });
}

Player.prototype.getID = function() {
  return this.socket.id;
}

// export the class
module.exports = Player;