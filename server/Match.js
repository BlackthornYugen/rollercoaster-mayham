// Constructor
function Match() {
  this.players = [];
}

Match.prototype.addPlayer = function(player) {
  this.players.push(player);
}

// export the class
module.exports = Match;