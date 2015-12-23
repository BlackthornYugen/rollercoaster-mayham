// Constructor
function Card(paths) {
  this.paths = paths || [5,4,7,6,1,0,3,2]; // Default path is all straight lines
}

// export the class
module.exports = Card;