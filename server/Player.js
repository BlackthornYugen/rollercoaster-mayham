// Constructor
function Player(socket) {
  this.socket = socket;
  this.name = "";
  this.cards = [3,4,5];
  
  // socket.on('draw', drawCard);
  // socket.on('play', playCard);
  socket.on('getHand', getHand);
}

Player.prototype.getName = function() {
  return this.name;
}

Player.prototype.getID = function() {
  return this.socket.id;
}

var getHand = function() {
  return this.cards;
}

// export the class
module.exports = Player;